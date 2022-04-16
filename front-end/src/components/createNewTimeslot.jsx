import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker/src/DateTimePicker";
import { useFormik } from "formik";
import http from "../services/httpService";
import { DropdownButton } from "react-bootstrap";
const uri = process.env.REACT_APP_API_ENDPOINT;

const CreateNewTimeSlot = () => {
  const [startTime, changeStartTime] = useState(new Date());
  const [endTime, changeEndTime] = useState(new Date());
  const [coaches, setCoaches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // const formik = useFormik({
  //   initialValues: {
  //     coachId: "",
  //     branchId: "",
  //   },
  //   onSubmit: () => {},
  //   validationSchema: Yup.object({
  //     coachId: Yup.string(),
  //     branchId: Yup.string(),
  //   }),
  //   validateOnChange: false,
  //   validateOnBlur: true,
  // });
  useEffect(() => {
    async function fetchCoach() {
      const data = await http.get(uri + "/branch_staff");
      let coaches = data.data.filter((staff) => {
        return staff.isCoach == true;
      });
      setCoaches(coaches);
    }
    async function fetchBranch() {
      const data = await http.get(uri + "/branch");
      setBranches(data.data);
    }
    fetchBranch();
    fetchCoach();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <h4>Pick a startTime</h4>
      </div>
      <div className="d-flex justify-content-center">
        <DateTimePicker onChange={changeStartTime} value={startTime} />
      </div>
      <div className="d-flex justify-content-center">
        <h4>Pick a startTime</h4>
      </div>
      <div className="d-flex justify-content-center">
        <DateTimePicker onChange={changeEndTime} value={endTime} />
      </div>
      <div>
        <DropdownButton id="dropdown-basic-button" title="Coach">
          {coaches.map((coach) => (
            <Dropdown.Item onClick={() => setSelectedCoach(coach)}>
              {coach.firstName + coach.lastName}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div>
        <DropdownButton id="dropdown-basic-button" title="Branch">
          {branches.map((branch) => (
            <Dropdown.Item onClick={() => setSelectedCoach(branch)}>
              {branch.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      {/*<div className="d-flex justify-content-center">*/}
      {/*  <form>*/}
      {/*    <div className="form-group">*/}
      {/*      <label htmlFor="exampleInputEmail1">CoachId</label>*/}
      {/*      <input*/}
      {/*        type="string"*/}
      {/*        name="coachId"*/}
      {/*        className="form-control"*/}
      {/*        id="exampleInputEmail1"*/}
      {/*        aria-describedby="emailHelp"*/}
      {/*        onChange={formik.handleChange}*/}
      {/*        value={formik.values.coachId}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="form-group">*/}
      {/*      <label htmlFor="exampleInputPassword1">BranchId</label>*/}
      {/*      <input*/}
      {/*        type="string"*/}
      {/*        className="form-control"*/}
      {/*        id="exampleInputPassword1"*/}
      {/*        name="branchId"*/}
      {/*        nChange={formik.handleChange}*/}
      {/*        value={formik.values.branchId}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <button*/}
      {/*      type="submit"*/}
      {/*      className="btn btn-primary"*/}
      {/*      onClick={formik.handleSubmit}*/}
      {/*    >*/}
      {/*      Submit*/}
      {/*    </button>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </div>
  );
};

export default CreateNewTimeSlot;
