import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { ms } from "react-native-size-matters";
import { COLORS, FONTS } from "../../../assets/theme";
import { Button, Card, Modal } from "react-native-paper";
import { Divider } from "react-native-elements";
import moment from "moment";
import { GeneralButton, GeneralTextInput } from "../../../component";
import constants from "../../../assets/constants/index";

export default function TaskPending(props) {
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
    showModalAccept,
  } = props;

  return (
    <>
      <>
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
                  Trip to {data?.data?.destination}
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
                <Text style={styles.txt2}>DESTINATION : </Text>
                <Text style={[styles.txt1, { marginBottom: 12 }]}>
                  {data?.data?.destination}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.txt2}>PURPOSE : </Text>
                <Text style={[styles.txt1, { marginBottom: 12 }]}>
                  {data?.data?.Purpose}
                </Text>
              </View>

              <GeneralButton
                style={styles.surveyButton}
                mode="contained"
                onPress={() => showModalAccept(data?.data)}
              >
                Accept
              </GeneralButton>
            </View>
          </View>
        </Card>
      </>
    </>
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
