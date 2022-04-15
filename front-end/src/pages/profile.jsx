import React from "react";
import ProfileCard from "../components/profileCard";
import FitnessProfileUpdate from "../components/FitnessProfileUpdate";
import axios from "axios";

class Profile extends React.Component {
  state = {
    profile: null,
    updateVisible: false,
  };

  async componentDidMount() {
    const id = localStorage.getItem("id");
    const res = await axios.get(`http://localhost:4000/customer/${id}`);
    const profile = res.data;
    console.log(profile);
    this.setState({ profile });
  }

  handleSubmitUpdate = async (values) => {
    console.log(values);
    const { BMI, BFP, height, weight } = values;
    const id = localStorage.getItem("id");
    const data = { BMI, BFP, height, weight };
    let req = await axios.patch(
      `http://localhost:4000/profile/:id'/${id}`,
      data
    );
    this.setState({ updateVisible: false });
    window.location.reload();
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
        <ProfileCard
          onUpdate={this.handleUpdate}
          profile={this.state.profile}
        />
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
