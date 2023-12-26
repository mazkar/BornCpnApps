import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../assets/theme";
import {
  AppBar,
  ColorBgContainer,
  PopUpLoader,
  RootContainer,
} from "../../component";
import axios from "axios";
import { baseUrl } from "../../utils/apiURL";
import { useSelector } from "react-redux";
import { Avatar, Button, Card, Divider } from "react-native-paper";
import { ms } from "react-native-size-matters";
import moment from "moment";
import CardSum1 from "./component/CardSum1";
import CardSum2 from "./component/CardSum2";
import { useFocusEffect } from "@react-navigation/native";

export default function Dashbaord({ navigation }) {
  const [dataPending, setDataPending] = useState([]);
  const [dataActive, setDataActive] = useState([]);
  const [dataComplete, setDataComplete] = useState([]);
  const uid = useSelector((state) => state?.auth?.user?.UserId);
  const user = useSelector((state) => state?.auth?.user);
  const token = useSelector((state) => state.auth.token);
  const [isLoadingGet, setIsLoadingGet] = useState(false);
  const userData = useSelector((state) => state?.auth?.user);

  async function getDataPending(userId, stat) {
    setIsLoadingGet(true);
    try {
      let res = await axios({
        url: `${baseUrl.URL}carpooling/getListDriverUsage/${userId}/${stat}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "meeeeeeeee");
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "meeeeeeeee");
        setDataPending(res.data);
        // setDataMenu(res.data.data);
        // setIsLoadingGet(false);
        // console.log(res.data, "transit");
        setIsLoadingGet(false);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
      setIsLoadingGet(false);
    }
  }
  async function getDataActiveg(userId, stat) {
    setIsLoadingGet(true);
    try {
      let res = await axios({
        url: `${baseUrl.URL}carpooling/getListDriverUsage/${userId}/${stat}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "meeeeeeeee");
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "meeeeeeeee");
        setDataActive(res.data);
        // setDataMenu(res.data.data);
        // setIsLoadingGet(false);
        // console.log(res.data, "transit");
        setIsLoadingGet(false);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
      setIsLoadingGet(false);
    }
  }
  async function getDataComplete(userId, stat) {
    setIsLoadingGet(true);
    try {
      let res = await axios({
        url: `${baseUrl.URL}carpooling/getListDriverUsage/${userId}/${stat}`,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "meeeeeeeee");
      if (res.status == 200) {
        // test for status you want, etc
        console.log(res.data, "meeeeeeeee");
        setDataComplete(res.data);
        // setDataMenu(res.data.data);
        // setIsLoadingGet(false);
        // console.log(res.data, "transit");
        setIsLoadingGet(false);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getDataPending(userData?.uid, "Assigned");
    getDataActiveg(userData?.uid, "Active");
    getDataComplete(userData?.uid, "Completed");
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getDataPending(userData?.uid, "Assigned");
      getDataActiveg(userData?.uid, "Active");
      getDataComplete(userData?.uid, "Completed");
      // getMenuPagination(uid);
      // Add your logic here to update the component or fetch new data

      // Example: Refresh data or update components
    }, [])
  );

  return (
    <ColorBgContainer>
      <RootContainer isTransparent>
        <AppBar
          title="Dashboard"
          dataTaskPending={[]}
          // handleLogut={handleLogut}
          navigation={navigation}
        />
        {/* <Button onPress={() => console.log(userData)}>onPress</Button> */}
        <ImageBackground
          source={require("../../assets/images/BACKGROUND.png")} // Replace with your image URL or local path
          style={styles.backgroundImage}
        >
          <View>
            <View
              style={{
                // backgroundColor: "red",
                flexDirection: "row",
                justifyContent: "flex-start",
                marginBottom: ms(22),
              }}
            >
              <View>
                <Text style={{ color: COLORS.PRIMARY_DARK, fontSize: ms(18) }}>
                  Hi, {userData?.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.PRIMARY_DARK,
                    fontSize: ms(14),
                    fontWeight: "300",
                  }}
                >
                  PT. {userData?.company}
                </Text>
                <Text
                  style={{
                    color: COLORS.PRIMARY_DARK,
                    fontSize: ms(14),
                    fontWeight: "300",
                  }}
                >
                  Driver
                </Text>
                <Text
                  style={{
                    color: COLORS.PRIMARY_DARK,
                    fontSize: ms(14),
                    fontWeight: "500",
                  }}
                >
                  {moment().format("YYYY-MM-DD")}
                </Text>
              </View>
              <View style={{ marginLeft: ms(12) }}>
                <TouchableOpacity
                // onPress={() => setNotifVisible(!notifVisible)}
                >
                  {/* <Avatar.Text size={72} label="A" color="white" /> */}
                </TouchableOpacity>
              </View>
            </View>
            <Divider style={{ height: 1 }} />
            <View style={{ marginBottom: ms(12), marginTop: ms(12) }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: COLORS.PRIMARY_DARK,
                }}
              >
                Driver Task Summary
              </Text>
              <View
                style={{
                  borderBottomColor: COLORS.PRIMARY_DARK,
                  borderBottomWidth: 4,
                  width: 24,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignContent: "center",
                marginBottom: ms(12),
              }}
            >
              <View>
                <CardSum1
                  title="Task Pending"
                  count={dataPending?.length}
                  color="orange"
                  navigation={navigation}
                />
              </View>
              <View>
                <CardSum1
                  title="Task Active"
                  count={dataActive?.length}
                  color="#007BFF"
                  navigation={navigation}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                marginBottom: ms(32),
              }}
            >
              <CardSum2
                title="Task Complete"
                count={dataComplete?.length}
                color="#28A745"
                navigation={navigation}
              />
            </View>
          </View>
        </ImageBackground>
        <PopUpLoader visible={isLoadingGet} />
      </RootContainer>
    </ColorBgContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover", // or 'contain' or 'stretch' or 'repeat'
    padding: ms(22),
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
