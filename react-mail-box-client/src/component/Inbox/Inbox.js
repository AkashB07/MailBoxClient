import { useEffect, useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";

import { mailActions } from "../../store/mail-slice";
import ViewMail from "../ViewMail/ViewMail";

const url = 'http://localhost';

const Inbox = () => {
    // const token = useSelector(state => state.auth.token);
    const token = localStorage.getItem('token');

    const dispatch = useDispatch();
    const { receivedMail } = useSelector((state) => state.mail);
    let [nonRead, setNonRead] = useState(0);
    //   const senderMail = useSelector((state) => state.auth.email);
    //   const email = senderMail.replace("@", "").replace(".", "");


    const getMailsHandler = useCallback(async () => {
        try {
            const transformData = (mail) => {
                const newData = [];
                for (let key of mail) {
                    newData.push(key);
                    if (key.isRead === 'false') {
                        setNonRead(++nonRead);
                    }
                }
                dispatch(mailActions.updateReceivedMail({ mail: newData }));
            };

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

    const viewMailHandler = async (mail) => {
        try {
            dispatch(mailActions.viewMailHandle({ id: mail._id }));
            setNonRead(nonRead);
            await axios.patch(`${url}:4000/mail/updatemail`, { id: mail._id }, { headers: { "Authorization": token } });
            getMailsHandler()
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="row justify-content-center">
            <h1 className="text-center">Inbox</h1><br /><br /><br />
            <div className="col-md-11" >
                <Table striped >
                    <thead>
                        <tr>
                            <th><h5 className="fw-bold">unread - {nonRead}</h5></th>
                            <th><h5 className="fw-bold">Sender</h5></th>
                            <th><h5 className="fw-bold">Subject</h5></th>
                            <th><h5 className="fw-bold">Date</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {receivedMail.map((mail) => {
                            return (
                                <tr key={mail._id}>
                                    <td >
                                        <div
                                            style={{
                                                backgroundColor:  mail.isRead==='false'? "blue": "white",            
                                                height: "10px",
                                                width: "10px",
                                                marginTop: "0px",
                                                marginRight: "0%",
                                                border: "1px solid black",
                                            }}
                                        ></div>
                                    </td>
                                    <td>{mail.from}</td>
                                    <td>{mail.subject}</td>
                                    <td>{new Date(mail.createdAt).toDateString()}</td>
                                    <td>
                                        <Button variant="success" onClick={() => viewMailHandler(mail)}>
                                            View
                                        </Button>
                                    </td>
                                    <ViewMail mail={mail} type={"recevied"} />
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