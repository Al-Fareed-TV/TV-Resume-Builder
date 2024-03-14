import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from '../../img/tvlogo.png'
import './MyPDF.css'
const styles = StyleSheet.create({
  logo: {
    height: "40px",
    width: "60px",
  },
  text: {
    fontSize: "9px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    fontSize: "9px",
    marginTop: "auto",
    marginBottom: "0px",
  },
  page: {
    padding: "30px",
    fontSize: 11,
  },
  userName: {
    fontSize: 30,
    fontWeight: 800,
    fontFamily: "Times-Roman",
    color: "rgb(78, 175, 210)",
  },
  profileSection: {
    marginVertical: 10,
  },
  url: {
    fontSize: 15,
  },
  subHeading: {
    fontSize: 14,
    color: "rgb(106, 180, 207)",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  lists: {
    marginHorizontal: 15,
  },
  type: {
    fontWeight: "bold",
  },
  projectSection: {
    marginBottom: 4,
  },
  footer: {
    marginTop: "auto",
    marginBottom: 2,
    display: "flex",
    flexDirection: "column",
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  line: {
    backgroundColor: "rgb(106, 180, 207)",
    border: "none",
    height: 3,
    marginVertical: 3,
  },
});
const MyPDF = (props) => {
  let jsonData =
    props.data || localStorage.getItem("myProfile");
  console.log("JSON data = ", jsonData);
  let profileData = jsonData.profile;
  let customData = jsonData.customForm; 
  return (
    <Document>
      <Page size="A4" style={styles.page} className="page">
        <View fixed>
          <View className="header" style={styles.header}>
            <Image src={logo} alt="TV Logo" style={styles.logo} />
            <Text style={styles.description}>
              Confidential - TestVagrant Technologies Private Limited
            </Text>
          </View>
          <View style={styles.line}></View>
        </View>
        <View className="profile-section" style={styles.profileSection}>
          <Text className="user-name" style={styles.userName}>
            {profileData.name}
          </Text>
          <Text className="url" style={styles.url}>
            {profileData.url}
          </Text>
          <Text className="sub-heading" style={styles.subHeading}>
            OVERVIEW
          </Text>
          <Text>
            {profileData.designation} - {profileData.experience}
          </Text>
          <ul style={{ listStyle: "none" }}>
            {profileData.desc.split("\n").map((points) => {
              return (
                <li>
                  <Text>
                    {"\u2022 \t"}
                    {points}
                  </Text>
                </li>
              );
            })}
          </ul>
        </View>

        <View>
          {customData.map((form, index) => {
            const lists = form.list.split("\\n");
            return (
              <View key={index}>
                <Text style={styles.subHeading}>{form.title}</Text>
                <Text>
                  {<br />}
                  {form.desc}
                </Text>
                <ul style={{ listStyle: "none" }}>
                  {lists.map((skill) => {
                    return (
                      <li>
                        <Text style={styles.lists}>
                          {"\u2022 \t"}
                          {skill}
                          <br />
                        </Text>
                      </li>
                    );
                  })}
                </ul>
              </View>
            );
          })}
        </View>

        <View className="footer" style={styles.footer} fixed>
          <Text>CIN:U72200KA2014PTC075831</Text>
          <View style={styles.line}></View>
          <Text>TESTVAGRANT TECHNOLOGIES PRIVATE LIMITED</Text>
          <Text>
            #284, Hothur Square, 1st Floor, 100 Feet Rd, Bengaluru, Karnataka
            560008 | <Text>info@testvagrant.com</Text>{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyPDF;
