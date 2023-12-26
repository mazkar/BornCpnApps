import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ms } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../assets/theme";
import { Button, Card } from "react-native-paper";
import { Divider } from "react-native-elements";
import moment from "moment";
import { GeneralButton } from "../../../component";

export default function TaskActive(props) {
  const {
    style,
    data,
    totalOrderReq,
    assigneDate,
    totalOnSite,
    index,
    indexTab,
    assignedBy,
    onPress,
    isPickup,
    showModalFinish,
  } = props;
  return (
    <Card style={[styles.container, style]}>
      <View style={{}}>
        {/* <Text style={[styles.txt1, { marginRight: 4 }]}>{index}.</Text> */}

        <View>
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "red",
              width: "100%",
            }}
          >
            <Image
              style={{ height: 24, width: 24 }}
              source={require("../../../assets/images/iconTask.png")}
            />

            <Text
              style={[
                styles.txt1,
                {
                  marginBottom: ms(8),
                  marginTop: ms(4),
                  marginLeft: ms(4),
                },
              ]}
            >
              Trip
            </Text>
          </View>

          <Divider bold />

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt2}>REQUEST BY : </Text>
            <Text style={[styles.txt1, { marginBottom: 12 }]}>
              {data?.data?.requestBy}
            </Text>
          </View>
          <Divider bold />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt2}>START DATE : </Text>
            <Text style={[styles.txt1, { marginBottom: 12 }]}>
              {moment(data?.data?.DateTimeStart).format("YYYY-MM-DD")}
            </Text>
          </View>
          <Divider bold />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt2}>END DATE : </Text>
            <Text style={[styles.txt1, { marginBottom: 12 }]}>
              {" "}
              {moment(data?.data?.DateTimeEnd).format("YYYY-MM-DD")}
            </Text>
          </View>
          <Divider bold />

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt2}>KM Start : </Text>
            <Text style={[styles.txt1, { marginBottom: 12 }]}>
              {data?.data?.KMStart}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt2}>KM END : </Text>
            <Text style={[styles.txt1, { marginBottom: 12 }]}>-</Text>
          </View>
          <Divider bold />
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt2}>DESTINATION : </Text>
            <Text style={[styles.txt1, { marginBottom: 12 }]}>
              {data?.data?.destination}
            </Text>
          </View>
          <Divider bold />

          <View style={{ flexDirection: "row" }}>
            <Text style={styles.txt2}>PURPOSE : </Text>
            <Text style={[styles.txt1, { marginBottom: 12 }]}>
              {data?.data?.Purpose}
            </Text>
          </View>
          <GeneralButton
            style={styles.surveyButton}
            mode="contained"
            onPress={() => showModalFinish(data?.data)}
          >
            Finish
          </GeneralButton>

          {/* <View>
                <Text style={styles.txt2}>ASSIGNED BY</Text>
                <Divider bold />
                <Text style={styles.txt2}>ASSIGNED DATE</Text>
                <Divider bold />
                <Text style={styles.txt2}>TOTAL ORDER REQUEST</Text>
                <Divider bold />
              </View>
              <View>
                <Text style={styles.txt2}> : </Text>
                <Divider bold />
                <Text style={styles.txt2}> : </Text>
                <Divider bold />
                <Text style={styles.txt2}> : </Text>
                <Divider bold />
              </View> */}
          {/* <View style={{ width: "68%" }}>
                <Text style={[styles.txt1, { marginBottom: 12 }]}>
                  {assignedBy}
                </Text>
                <Divider bold />
                <Text
                  style={[styles.txt1, { marginBottom: 12 }]}
                  numberOfLines={1}
                >
                  {assigneDate}
                </Text>
                <Divider bold />
                <Text style={[styles.txt1, { marginBottom: 12 }]}>
                  {totalOrderReq}
                </Text>
                <Divider bold />
              </View> */}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    boder: "1px solid black",
    backgroundColor: COLORS.GRAY_ULTRASOFT,
    marginTop: ms(6),
  },
  txt1: {
    fontSize: FONTS.v10,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    color: COLORS.DARK,

    marginTop: ms(6),
  },
  txt2: {
    fontSize: FONTS.v10,
    fontWeight: "500",
    color: COLORS.PRIMARY_DARK,
    marginBottom: 12,
    marginTop: ms(6),
  },
  txtContainer: { marginBottom: 16 },
});
