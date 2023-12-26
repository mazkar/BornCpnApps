import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-paper";
import { GeneralTextInput, PopUpLoader } from "../../component";
import { COLORS } from "../../assets/theme";
import { moderateScale, ms } from "react-native-size-matters";
import constants from "../../assets/constants";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../utils/apiURL";
import { setToken, setUser } from "../../store/models/auth/actions";
import { encode } from "base-64";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const converToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log(token, "ini token");
      // You can access the payload data from the decoded token
      // For example, if your payload contains a 'userId' field
      dispatch(setUser(decodedToken));
      // const userId = decodedToken.userId;
      // console.log("User ID:", userId);
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  };
  async function handleLogin() {
    // setLoadingUpload(true);
    setIsLoading(true);
    const credentials = encode(`${email}:${password}`);

    // console.log(body);
    try {
      // console.log(body);
      let res = await axios({
        url: `${baseUrl.URL}Auth`,
        method: "GET",

        timeout: 8000,
        // data: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      });
      // console.log(res, "Success");
      if (res.status == 200) {
        dispatch(setToken(res.data.message));

        setUser(converToken(res?.data?.message));
        setTimeout(() => {
          setIsLoading(false);
          navigation.push("Main");
        }, 1000);
        console.log(res, "res auth");
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err, "error");
      setIsLoading(false);
      setMessageError(err.message);
      // setModalErrorVis(true);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={[styles.container, { flexDirection: "column" }]}>
        <View style={{ marginTop: moderateScale(164) }}>
          <Text
            style={{
              color: COLORS,
              alignSelf: "center",
              fontSize: moderateScale(18),
              color: COLORS.GRAY_HARD,
            }}
          >
            NOKIA BORN
          </Text>
        </View>
        <View style={{ marginTop: moderateScale(32), marginTop: ms(64) }}>
          <GeneralTextInput
            placeholder="Username"
            mode="outlined"
            value={email}
            title="Username"
            // hasErrors={authFailed}
            messageError="Wrong Username/Password"
            onChangeText={(e) => setEmail(e)}
            style={styles.inputUserName}
          />
          <View style={{ marginTop: ms(18), marginBottom: ms(64) }}>
            <GeneralTextInput
              placeholder="Password"
              mode="outlined"
              title="Password"
              value={password}
              // hasErrors={authFailed}
              secureTextEntry={showPassword}
              // messageError="Wrong Username/Password"
              // icoPress={() => {
              //   setHidePassword(!hidePassword);
              //   return false;
              // }}
              right={
                <TextInput.Icon
                  icon={showPassword ? "eye" : "eye-off"}
                  color={COLORS.PRIMARY_DARK}
                  onPress={togglePassword}
                />
              }
              onChangeText={(e) => setPassword(e)}
              style={styles.inputUserName}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.textBtn}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <PopUpLoader visible={isLoading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // CONTAINER
  scroll: {
    // flex: 1,
    backgroundColor: "white",
    // flexGrow: 1,
    height: "100%",
    paddingHorizontal: ms(16),
  },
  // image: {
  //   flex: 1,
  //   justifyContent: "center",
  //   paddingHorizontal: moderateScale(24),
  //   backgroundColor: "rgba(0, 0, 0, 0.1)",
  // },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },
  welcomeText: {
    color: COLORS.WHITE,
    fontStyle: "Poppins",
    fontSize: moderateScale(20),
    marginRight: moderateScale(8),
    paddingBottom: moderateScale(10),
    fontWeight: "bold",
  },
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: moderateScale(22),
    // paddingHorizontal: moderateScale(10),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ececec",
    fontSize: moderateScale(15),
    paddingLeft: 10,

    backgroundColor: "#FFFFFF",
    marginTop: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  logo: {
    width: moderateScale(181),
    height: moderateScale(144),
    alignSelf: "center",
    borderRadius: moderateScale(0),
  },
  text: {
    paddingBottom: moderateScale(5),
    paddingTop: moderateScale(2),

    marginBottom: moderateScale(5),
    marginTop: moderateScale(2),
    color: COLORS.PRIMARY_DARK,
    fontSize: moderateScale(15),
    fontWeight: "bold",
  },
  please: {
    fontSize: moderateScale(15),
    fontFamily: "SemiBold",

    textAlign: "justify",
    marginTop: moderateScale(10),
    marginLeft: 30,
  },
  textBtn: {
    color: "#FFFFFF",
    fontSize: moderateScale(15),
    fontWeight: "bold",
  },
  textGreen: {
    color: "#000000",
    fontSize: moderateScale(16),
  },
  button: {
    borderRadius: moderateScale(10),
    width: ms(148),
    height: ms(38),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY_DARK,
    alignSelf: "center",
    marginBottom: moderateScale(5),
    marginTop: moderateScale(10),
  },
  btnGoogle: {
    borderRadius: moderateScale(10),
    borderColor: COLORS.PRIMARY_MEDIUM,
    width: ms(95),
    height: ms(7),
    borderWidth: moderateScale(2),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
  },

  txtRegister: {
    flexDirection: "row",

    marginTop: moderateScale(10),
    marginBottom: moderateScale(12),
  },
  txtRegister2: {
    // flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginTop: moderateScale(40),
    marginBottom: moderateScale(12),
  },
  textWhite: {
    fontSize: moderateScale(15),
    marginRight: moderateScale(8),
    fontWeight: "600",
  },
  inputEmail: {
    paddingHorizontal: moderateScale(12),
    borderWidth: moderateScale(0.2),

    marginBottom: moderateScale(16),

    borderRadius: moderateScale(2),
  },
  borderLess: {
    borderColor: "transparent",
    marginBottom: moderateScale(-24),
    borderWidth: moderateScale(0.2),
  },
  inputUserName: { backgroundColor: COLORS.WHITE },
  inputUserPassword: { backgroundColor: COLORS.WHITE },
  containermodalView: {
    flexDirection: "column",
    alignSelf: "center",
    position: "absolute",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  modalText: {
    paddingTop: 20,
    marginBottom: 28,
    textAlign: "center",
    alignSelf: "center",
    fontSize: 17,
    letterSpacing: 1,
    lineHeight: 24,
    width: constants.SCREEN_WIDTH * 0.7,
    fontWeight: "600",
  },
  imgSubmit: {
    alignItems: "center",
    justifyContent: "center",
  },
});
