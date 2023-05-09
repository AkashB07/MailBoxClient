import { useEffect, useCallback } from "react";
import { Table} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { mailActions } from "../../store/mail-slice";

const url = 'http://localhost';

const Inbox = () => {
    // const token = useSelector(state => state.auth.token);
    const token =localStorage.getItem('token');

    const dispatch = useDispatch();
    const { receivedMail } = useSelector((state) => state.mail);
    //   const senderMail = useSelector((state) => state.auth.email);
    //   const email = senderMail.replace("@", "").replace(".", "");


    const getMailsHandler = useCallback(async (page) => {
        try {
            const transformData = (mail) => {
                const newData = [];
                for (let key of mail) {
                    newData.push(key);
                }
                dispatch(mailActions.updateReceivedMail({ mail: newData }));
            };
            console.log(token);
            const respone = await axios.get(`${url}:4000/mail/inbox`, { headers: { "Authorization": token } });
            transformData(respone.data.mails);
        }
        catch (error) {
            console.log(error);
        }

    }, [])

    useEffect(() => {
        getMailsHandler();
    }, [getMailsHandler]);

    return (
        <div className="row justify-content-center">
            <h1 className="text-center">Inbox</h1><br /><br /><br />
            <div className="col-md-11" >
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th><h5 className="fw-bold">Sender</h5></th>
                            <th><h5 className="fw-bold">Subject</h5></th>
                            <th><h5 className="fw-bold">Date</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {receivedMail.map((mail) => {
                            return (
                                <tr key={mail._id}>
                                    <td>{mail.from}</td>
                                    <td>{mail.subject}</td>
                                    <td>{new Date(mail.createdAt).toDateString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>

    );
};

export default Inbox;