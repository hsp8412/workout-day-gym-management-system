import React from "react";
import ProfileCard from "../components/profileCard";
import FitnessProfileUpdate from "../components/FitnessProfileUpdate";

class Profile extends React.Component {
  state = {
    updateVisible: false,
  };

  handleSubmitUpdate = (values) => {
    console.log(values);
  };

  handleUpdate = () => {
    this.setState({
      updateVisible: true,
    });
  };

  handleClose = () => {
    this.setState({
      updateVisible: false,
    });
  };

  render() {
    return (
      <div>
        <ProfileCard onUpdate={this.handleUpdate} />
        <FitnessProfileUpdate
          isVisible={this.state.updateVisible}
          onSubmitUpdate={this.handleSubmitUpdate}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Profile;
