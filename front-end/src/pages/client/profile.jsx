import React from "react";
import ProfileCard from "../../components/client/profile/profileCard";
import FitnessProfileUpdate from "../../components/client/profile/FitnessProfileUpdate";
import http from "../../services/httpService";

class Profile extends React.Component {
  state = {
    profile: { fitnessProfile: { weight: 0, height: 0, BMI: 0, BFP: 0 } },
    updateVisible: false,
  };

  async componentDidMount() {
    const id = localStorage.getItem("id");
    const res = await http.get(process.env.REACT_APP_API_ENDPOINT + '/customer/' + id);
    const profile = res.data;
    console.log(profile);
    this.setState({ profile });
  }

  handleSubmitUpdate = async (values) => {
    const { BMI, BFP, height, weight } = values;
    const id = localStorage.getItem("id");
    const data = { BMI, BFP, height, weight };
    let req = await http.patch(process.env.REACT_APP_API_ENDPOINT + '/customer/profile/' + id, data);
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
          profile={this.state.profile}
        />
      </div>
    );
  }
}

export default Profile;
