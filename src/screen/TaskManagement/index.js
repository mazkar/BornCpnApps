import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { Avatar, Button, Card, Divider, Modal } from "react-native-paper";
import { ms } from "react-native-size-matters";
import moment from "moment";
import TaskPending from "./TaskPending";
import { ScrollView } from "react-native-gesture-handler";
import TaskActive from "./TaskActive";
import TaskCmplete from "./TaskComplete";
import { GeneralButton, GeneralTextInput } from "../../component";
import constants from "../../assets/constants";
import ImagePickerExample from "./component/ImagePicker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
const buttonTab = [
  {
    id: 1,
    name: "Pending",
  },
  {
    id: 2,
    name: "Active",
  },
  {
    id: 3,
    name: "Complete",
  },
];

export default function TaskManagement({ navigation }) {
  const [dataList, setDataList] = useState([]);
  const uid = useSelector((state) => state?.auth?.user?.UserId);
  const user = useSelector((state) => state?.auth?.user);
  const token = useSelector((state) => state.auth.token);
  const [isLoadingGet, setIsLoadingGet] = useState(false);
  const userData = useSelector((state) => state?.auth?.user);
  const [activeTab, setActiveTab] = useState(1);

  //Modal acccept
  const [modalAcceptVis, setModalAcceptVis] = useState(false);
  const [valueKmStart, setValueKmStart] = useState("");
  const [image, setImage] = useState(null);
  const [imageToShow, setImageToShow] = useState(null);
  const [selectedDestination, setSelectedDetination] = useState("");
  const [selectedRequster, setSelectedRequester] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [modalSuccessVis, setModalSuccessVis] = useState(false);
  const [modalErrorVis, setModalErrorVis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCarAllocationId, setSelectedCarAllocationId] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMesage] = useState("");

  //Modal Finish
  const [modalFinishVis, setModalFinishVis] = useState(false);
  const [selectedKmStart, setSelectedKmStart] = useState("");
  const [valueKmEnd, setValueKmEnd] = useState("");
  const [selectedDriveId, setSelectedDriveId] = useState(0);

  const showModalAccept = (e) => {
    setModalAcceptVis(true);
    setSelectedDetination(e.destination);
    setSelectedRequester(e.requestBy);
    setSelectedStartDate(e.DateTimeStart);
    setSelectedEndDate(e.DateTimeEnd);
    setSelectedCarAllocationId(e.id);
  };
  const hideModalAccept = () => {
    setModalAcceptVis(false);
    setImage(null);
    setImageToShow(null);
    setValueKmStart("");
  };

  const showModalFinish = (e) => {
    setModalFinishVis(true);
    setSelectedKmStart(e.KMStart);
    setSelectedDetination(e.destination);
    setSelectedRequester(e.requestBy);
    setSelectedStartDate(e.DateTimeStart);
    setSelectedEndDate(e.DateTimeEnd);
    setSelectedCarAllocationId(e.carAllocationId);
    setSelectedDriveId(e.id);
  };
  const hideModalFInish = () => {
    setModalFinishVis(false);
    setImage(null);
    setImageToShow(null);
  };

  const hideModalSuccess = () => {
    setModalSuccessVis(false);
  };

  const hideModalError = () => {
    setModalErrorVis(false);
  };

  async function getDataPending(userId, stat) {
    setIsLoading(true);
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
        setDataList(res.data);
        // setDataMenu(res.data.data);
        // setIsLoadingGet(false);
        // console.log(res.data, "transit");
        setIsLoading(false);
      }
      // Don't forget to return something
      return res.data;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  }

  const onPressTab = (val) => {
    setActiveTab(val);
  };

  useEffect(() => {
    if (activeTab == 1) {
      getDataPending(userData?.uid, "Assigned");
    }
    if (activeTab == 2) {
      getDataPending(userData?.uid, "OnDutty");
    }
    if (activeTab == 3) {
      getDataPending(userData?.uid, "Completed");
    }
  }, [activeTab]);

  const SwitchComp = (val) => {
    if (activeTab == 2) {
      return <TaskActive data={val} showModalFinish={showModalFinish} />;
    } else if (activeTab == 3) {
      return <TaskCmplete data={val} />;
    } else {
      return (
        <TaskPending
          data={val}
          showModalAccept={showModalAccept}
          setSelectedEndDate={setSelectedEndDate}
          setSelectedRequester={setSelectedRequester}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedDetination={setSelectedDetination}
        />
      );
    }
  };

  const handleAccept = async () => {
    const formData = new FormData();
    formData.append("CarAllocationId", selectedCarAllocationId);
    formData.append("File", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpg",
    });
    formData.append("KMStart", valueKmStart);
    formData.append("LMBY", userData?.uid);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const timeOut = {
      timeout: 200000,
    };
    setIsLoading(true);
    axios
      .post(
        `${baseUrl.URL}carpooling/insertStartDriverUsage`,
        formData,
        config,
        timeOut
      )
      .then((response) => {
        console.log(response.data[0]);

        setModalSuccessVis(true);
        setModalAcceptVis(false);
        setIsLoading(false);
        getDataPending(userData?.uid, "Assigned");
        setSuccessMessage(response?.data[0].Message);
        setImage(null);
        setValueKmStart("");
      })
      .catch((error) => {
        console.error("Error uploading the file", error);
        setIsLoading(false);
        setModalErrorVis(true);
        setErrorMesage(error.message);
        setModalSuccessVis(false);
        setImage(null);
        setValueKmStart("");
      });
  };

  const handleFinish = async () => {
    const formData = new FormData();
    formData.append("id", selectedDriveId);
    formData.append("CarAllocationId", selectedCarAllocationId);
    formData.append("File", {
      uri: image,
      name: "photo.jpg",
      type: "image/jpg",
    });
    formData.append("KMEnd", valueKmEnd);
    formData.append("LMBY", userData?.uid);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userData.token}`,
      },
    };
    const timeOut = {
      timeout: 200000,
    };
    setIsLoading(true);
    axios
      .post(
        `${baseUrl.URL}carpooling/insertEndDriverUsage`,
        formData,
        config,
        timeOut
      )
      .then((response) => {
        console.log(response.data[0], "success");

        setModalSuccessVis(true);
        setModalFinishVis(false);
        setIsLoading(false);
        getDataPending(userData?.uid, "OnDutty");
        setSuccessMessage(response?.data[0].Message);
        setImage(null);
        setValueKmEnd("");
      })
      .catch((error) => {
        console.error("Error uploading the file", error);
        setIsLoading(false);
        setModalErrorVis(true);
        setModalFinishVis(false);
        setErrorMesage(error.message);
        setImage(null);
        setValueKmEnd("");
      });
  };

  return (
    <ColorBgContainer>
      <RootContainer isTransparent>
        <AppBar
          title="Task"
          dataTaskPending={[]}
          // handleLogut={handleLogut}
          navigation={navigation}
        />
        {/* <Button onPress={() => console.log(userData)}>onPress</Button> */}
        <ImageBackground
          source={require("../../assets/images/BACKGROUND.png")} // Replace with your image URL or local path
          style={styles.backgroundImage}
        >
          <View style={{ marginBottom: ms(12), marginTop: ms(12) }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: COLORS.PRIMARY_DARK,
              }}
            >
              Task Management
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
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {buttonTab?.map((val, index) => (
              <View key={val.id}>
                <TouchableOpacity
                  onPress={() => onPressTab(val.id)}
                  style={
                    activeTab == val.id
                      ? styles.buttonTabActiv
                      : styles.buttonTab
                  }
                >
                  <Text
                    style={
                      activeTab == val.id ? styles.textTabActiv : styles.textTab
                    }
                  >
                    {val.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          {dataList?.length == 0 ? (
            <>
              <View
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <View style={{ alignSelf: "center" }}>
                  <Image
                    style={{ height: 124, width: 124 }}
                    source={require("../../assets/images/empty_data.png")}
                  />
                </View>
                <View>
                  <Text
                    style={{ color: COLORS.PRIMARY_DARK, fontSize: ms(22) }}
                  >
                    No Task Available
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <ScrollView style={{ marginTop: ms(28) }}>
              {dataList?.map((e, i) => (
                <SwitchComp data={e} />
              ))}
            </ScrollView>
          )}
          <PopUpLoader visible={isLoading} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalAcceptVis}
            style={{ zIndex: 9999 }}
            onRequestClose={hideModalAccept}
          >
            {/* <View style={styles.centeredView}> */}
            <View style={styles.containermodalView3}>
              <View style={styles.inputForm}>
                <Text style={styles.textModal}>Accept Task</Text>
                <Divider bold style={{ marginBottom: ms(12) }} />
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>Trip to :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""} {selectedDestination}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>Request by :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""}
                      {selectedRequster}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>Start Date :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""}
                      {moment(selectedStartDate).format("YYYY-MM-DD")}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>End Date :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""}
                      {moment(selectedEndDate).format("YYYY-MM-DD")}
                    </Text>
                  </Text>
                </View>
                <Divider bold />
                <View style={{ marginBottom: ms(12), marginTop: ms(22) }}>
                  <GeneralTextInput
                    placeholder="KM Start"
                    mode="outlined"
                    value={valueKmStart}
                    //   disabled
                    title="KM Start"
                    // hasErrors={authFailed}
                    messageError="Wrong Username/Password"
                    onChangeText={(e) => setValueKmStart(e)}
                    style={styles.inputUserName}
                  />
                </View>
                <View style={styles.inputForm}>
                  <Text style={styles.textModal}>Upload KM Start</Text>
                  <ImagePickerExample
                    image={image}
                    setImage={setImage}
                    imageToShow={imageToShow}
                    setImageToShow={setImageToShow}
                  />
                </View>
                <View style={{ marginBottom: ms(12) }}>
                  {imageToShow && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 120, height: 120 }}
                    />
                  )}
                </View>
                <Divider bold />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: ms(12),
                  }}
                >
                  <GeneralButton
                    style={{ backgroundColor: "gray" }}
                    mode="contained"
                    onPress={() => hideModalAccept()}
                  >
                    Cancel
                  </GeneralButton>
                  <GeneralButton
                    style={{ marginLeft: ms(4) }}
                    mode="contained"
                    onPress={() => handleAccept()}
                    disabled={valueKmStart == "" || image == null}
                  >
                    Accept
                  </GeneralButton>
                </View>
              </View>
            </View>
            {/* </View> */}
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalFinishVis}
            style={{ zIndex: 9999 }}
            onRequestClose={hideModalFInish}
          >
            {/* <View style={styles.centeredView}> */}
            <View style={styles.containermodalView3}>
              <View style={styles.inputForm}>
                <Text style={styles.textModal}>Finish Task</Text>
                <Divider bold style={{ marginBottom: ms(12) }} />
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>Trip to :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""} {selectedDestination}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>Request by :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""}
                      {selectedRequster}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>Start Date :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""}
                      {moment(selectedStartDate).format("YYYY-MM-DD")}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>End Date :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""}
                      {moment(selectedEndDate).format("YYYY-MM-DD")}
                    </Text>
                  </Text>
                </View>
                <View style={{ marginBottom: ms(6) }}>
                  <Text style={{ fontSize: 11 }}>
                    <Text>KM Start :</Text>
                    <Text
                      style={{ color: COLORS.PRIMARY_DARK, fontWeight: "600" }}
                    >
                      {""}
                      {selectedKmStart}
                    </Text>
                  </Text>
                </View>
                <Divider bold />
                <View style={{ marginBottom: ms(12), marginTop: ms(22) }}>
                  <GeneralTextInput
                    placeholder="KM END"
                    mode="outlined"
                    value={valueKmStart}
                    //   disabled
                    title="KM END"
                    // hasErrors={authFailed}
                    messageError="Wrong Username/Password"
                    onChangeText={(e) => setValueKmEnd(e)}
                    style={styles.inputUserName}
                  />
                </View>
                <View style={styles.inputForm}>
                  <Text style={styles.textModal}>Upload KM End</Text>
                  <ImagePickerExample
                    image={image}
                    setImage={setImage}
                    imageToShow={imageToShow}
                    setImageToShow={setImageToShow}
                  />
                </View>
                <View style={{ marginBottom: ms(12) }}>
                  {imageToShow && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 120, height: 120 }}
                    />
                  )}
                </View>
                <Divider bold />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: ms(12),
                  }}
                >
                  <GeneralButton
                    style={{ backgroundColor: "gray" }}
                    mode="contained"
                    onPress={() => hideModalFInish()}
                  >
                    Cancel
                  </GeneralButton>
                  <GeneralButton
                    style={{ marginLeft: ms(4) }}
                    mode="contained"
                    onPress={() => handleFinish()}
                    disabled={valueKmEnd == "" || image == null}
                  >
                    Accept
                  </GeneralButton>
                </View>
              </View>
            </View>
            {/* </View> */}
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSuccessVis}
            onRequestClose={hideModalSuccess}
          >
            {/* <View style={styles.centeredView}> */}
            <View style={styles.containermodalView}>
              <View style={styles.imgSubmit}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  style={{ fontSize: 72, color: COLORS.SUCCESS }}
                />
              </View>
              <Text style={styles.modalText}>{successMessage}</Text>
              <GeneralButton
                style={{ backgroundColor: COLORS.PRIMARY_DARK }}
                mode="contained"
                onPress={hideModalSuccess}
              >
                Close
              </GeneralButton>
            </View>
            {/* </View> */}
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalErrorVis}
            onRequestClose={hideModalError}
          >
            {/* <View style={styles.centeredView}> */}
            <View style={styles.containermodalView}>
              <View style={styles.imgSubmit}>
                <FontAwesome
                  name="close"
                  size={24}
                  style={{ fontSize: 72, color: COLORS.RED_BG }}
                />
              </View>
              <Text style={styles.modalText}>{modalErrorVis}</Text>
              <GeneralButton
                style={{ backgroundColor: COLORS.PRIMARY_MEDIUM }}
                mode="contained"
                onPress={hideModalError}
              >
                Close
              </GeneralButton>
            </View>
            {/* </View> */}
          </Modal>
        </ImageBackground>
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
  buttonTab: {
    backgroundColor: COLORS.GRAY_SOFT,
    paddingHorizontal: ms(12),
    paddingVertical: ms(6),
    borderRadius: ms(6),
  },
  textTab: {
    color: "gray",
  },
  buttonTabActiv: {
    backgroundColor: COLORS.PRIMARY_DARK,
    paddingHorizontal: ms(12),
    paddingVertical: ms(6),
    borderRadius: ms(6),
  },
  textTabActiv: {
    color: COLORS.WHITE,
  },
  containermodalView3: {
    flexDirection: "column",
    alignSelf: "center",
    // position: "absolute",
    width: constants.SCREEN_WIDTH * 0.9,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 28,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  textModal: {
    color: COLORS.PRIMARY_DARK,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: ms(4),
  },
  containermodalView: {
    flexDirection: "column",
    alignSelf: "center",
    // position: "absolute",
    width: constants.SCREEN_WIDTH * 0.8,
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
