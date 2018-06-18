/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

import React from "react";
import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import { ListView } from 'realm/react-native'
import { LargeList } from "react-native-largelist";
import { messages } from "./DataSource";

class PeopleList extends React.Component {
    messages;
    largeList;

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            refreshing: false,
            dataSource: ds.cloneWithRows(props.people),
        };
        this.messages = [...messages];
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) => (
                    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                           <Text>{rowData.firstName}</Text>
                        </View>
                    </View>
                )}
            />
        );
    }

    renderItem(section, row) {
        let msg = this.messages[row];
        return (
            <View style={{ flex: 1, backgroundColor: "#FFF" }}>
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Text>{row}</Text>
                    <Image
                        source={msg.icon}
                        style={{ marginLeft: 16, width: 44, height: 44 }}
                    />
                    <View style={{ marginLeft: 4 }}>
                        <Text style={{ fontSize: 18 }}>
                            {msg.title}
                        </Text>
                        <Text style={{ fontSize: 14, marginTop: 8 }}>
                            {msg.subtitle}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    renderRight(section, row) {
        return (
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View
                    style={{ flex: 1, backgroundColor: "blue", justifyContent: "center" }}
                    removeClippedSubviews={true}
                >
                    <Text
                        style={{ marginLeft: 10, alignSelf: "center" }}
                        numberOfLines={1}
                    >
                        More
          </Text>
                </View>
                <TouchableOpacity
                    style={{ flex: 1, backgroundColor: "red", justifyContent: "center" }}
                    removeClippedSubviews={true}
                    onPress={() => {
                        this.messages.splice(row, 1);
                        this.largeList.reloadData();
                    }}
                >
                    <Text
                        style={{ marginLeft: 10, alignSelf: "center" }}
                        numberOfLines={1}
                    >
                        Delete
          </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default PeopleList;