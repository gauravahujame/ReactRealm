// MyComponent.js
import React from 'react';
import { connectRealm } from 'react-native-realm';
import { View, Text } from 'react-native';
import PeopleList from './PeopleList';

class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    // for(i = 0; i < 500; i++) {
    //   this.addPerson(i);
    // }

  }

  addPerson = (i) => {
    const { realm } = this.props;
    realm.write(() => {
      realm.create('Person', {
        firstName: 'Tim',
        lastName: `Cook ${i}`,
      });
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text> React realm list</Text>
        <PeopleList people={this.props.people} />
      </View>
    );
  }
}

export default connectRealm(MyComponent, {
  schemas: ['Person'],
  mapToProps(results, realm, ownProps) {
    // the object that is returned from the mapToProps function
    // will be merged into the components props
    return {
      realm,
      // property on the results argument is the camel-cased and
      // pluralized version of the schema name, so...
      // instead of person being the property we get people
      people: results.people,
    };
  },
});