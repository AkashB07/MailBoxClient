import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { mailActions } from "../../store/mail-slice"; 

const url = 'http://localhost';

const ViewMail = (props) => {

  const viewMail = useSelector((state) => state.mail.viewMail);
  const mailId = useSelector(state => state.mail.mailId);
  const mailBody = useSelector(state => state.mail. mailBody);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const viewMailHandler = () => {
    dispatch(mailActions.mailHandler());
  };

  const deleteMailHandler = async () => {
    try {
      await axios.delete(`${url}:4000/mail/delete/${mailId}`, { headers: { "Authorization": token } });
      dispatch(mailActions.mailHandler());
    } 
    catch (error) {
      console.log(error)
    }
  };
  
 
  return (
    <Modal
      show={viewMail}
      onHide={viewMailHandler}
      backdrop="static"
      keyboard={false}
    >
      {console.log(props.mail)}
      <Modal.Header closeButton>
        <Modal.Title>Mail</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mailBody.replace(/<[^>]*>/g, "")}</Modal.Body>
      <Modal.Footer>
      <Button variant="danger" onClick={deleteMailHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewMail;