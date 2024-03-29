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
    const uri = process.env.REACT_APP_API_ENDPOINT + "/customer/";
    const res = await http.get(
      // `http://localhost:4000/customer/${id}`
      uri + id
    );
    const profile = res.data;
    this.setState({ profile });
  }

  handleSubmitUpdate = async (values) => {
    const { BMI, BFP, height, weight } = values;
    const id = localStorage.getItem("id");
    const data = { BMI, BFP, height, weight };
    const uri = process.env.REACT_APP_API_ENDPOINT + "/customer/profile/";
    let req = await http.patch(
      // `http://localhost:4000/customer/profile/${id}`,
      uri + id,
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
          profile={this.state.profile}
        />
      </div>
    );
  }
}

export default Profile;
