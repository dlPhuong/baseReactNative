package com.basereact;

import android.content.Context;
import android.hardware.fingerprint.FingerprintManager;
import android.media.audiofx.AcousticEchoCanceler;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import com.facebook.react.bridge.Promise;

public class FingerModule extends ReactContextBaseJavaModule {
    Map<String, Object> constants = new HashMap<>();

    FingerModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "FingerModule";
    }

    @Override
    public Map<String, Object> getConstants() {
        constants.put("COUNT_FINGER", "123");
        return constants;
    }

    @ReactMethod
    @RequiresApi(api = Build.VERSION_CODES.M)
    public void getFingerprintInfo(final Promise promise) {
        int count = 0;
        int temp = 0;
        try {
            FingerprintManager fingerprintManager = (FingerprintManager) getReactApplicationContext().getSystemService(Context.FINGERPRINT_SERVICE);
            Method method = FingerprintManager.class.getDeclaredMethod("getEnrolledFingerprints");
            Object obj = method.invoke(fingerprintManager);

            if (obj != null) {
                Class<?> clazz = Class.forName("android.hardware.fingerprint.Fingerprint");
                Method getFingerId = clazz.getDeclaredMethod("getFingerId");

                for (int i = 0; i < ((List) obj).size(); i++) {
                    Object item = ((List) obj).get(i);
                    if (item != null) {
                        System.out.println("fkie4. fingerId: " + getFingerId.invoke(item));
                        // Log.d("TAGHIHI", "getFingerprintInfo: "+getFingerId.invoke(item));
                        count++;
                        Log.d("TAGHIHI", "" + count);
                    }
                }
                temp = count;
                count = 0;
                promise.resolve(temp);
            }
        } catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}