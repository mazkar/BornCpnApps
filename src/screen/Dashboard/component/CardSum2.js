import { View, Text, Touchable } from "react-native";
import React from "react";
import { Card, Divider } from "react-native-paper";
import { ms } from "react-native-size-matters";
import { COLORS } from "../../../assets/theme";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CardSum2({ title, count, color, navigation }) {
  return (
    <View>
      <Card
        style={{
          height: ms(84),
          width: 196,
          //   justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: color,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <View>
              <Text style={{ color: COLORS.WHITE }}>{title}</Text>
            </View>
            {/* <Divider
              style={{
                backgroundColor: COLORS.BLACK,
                height: 1,
              }}
            /> */}
            <View style={{ alignSelf: "center" }}>
              <Text style={{ color: COLORS.WHITE, fontSize: ms(18) }}>
                {count}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ alignSelf: "center", flexDirection: "row" }}
            onPress={() => navigation.navigate("Task")}
          >
            <Text style={{ color: "white" }}>Detail</Text>
            <FontAwesome
              name="chevron-circle-right"
              size={24}
              style={{
                fontSize: 14,
                color: COLORS.WHITE,
                alignSelf: "center",
                marginLeft: ms(2),
              }}
            />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}
