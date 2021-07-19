import React, { useState,useEffect } from "react";
import { View, Text } from "react-native";
import { theme } from "../core/theme";
export function renderLabel(label) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontWeight: 'bold' }}>{label + " "}</Text>
      <Text style={{ color: theme.colors.error }}>*</Text>
    </View>
  );
}