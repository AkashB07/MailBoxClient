import { useEffect, useCallback, useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "react-bootstrap";

import { mailActions } from "../../store/mail-slice";
import ViewMail from "../ViewMail/ViewMail";

const url = 'http://localhost';

const Sent = () => {
    // const token = useSelector(state => state.auth.token);
    const token = localStorage.getItem('token');

    const dispatch = useDispatch();
    const { sentMail } = useSelector((state) => state.mail);
    let [nonRead, setNonRead] = useState(0);

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
                dispatch(mailActions.updateSentMail({ mail: newData }));
            };

            const respone = await axios.get(`${url}:4000/mail/sent`, { headers: { "Authorization": token } });
            setNonRead(0);
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
            dispatch(mailActions.viewSentHandler({ id: mail._id, body: mail.body }));
            setNonRead(nonRead);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="row justify-content-center">
            <h1 className="text-center">Sent Mails</h1><br /><br /><br />
            <div className="col-md-11" >
                <Table striped >
                    <thead>
                        <tr>
                            <th><h5 className="fw-bold">Send To</h5></th>
                            <th><h5 className="fw-bold">Subject</h5></th>
                            <th><h5 className="fw-bold">Date</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sentMail.map((mail) => {
                            return (
                                <tr key={mail._id}>  
                                    <td>{mail.to}</td>
                                    <td>{mail.subject}</td>
                                    <td>{new Date(mail.createdAt).toDateString()}</td>
                                    <td>
                                        <Button variant="success" onClick={() => viewMailHandler(mail)}>
                                            View
                                        </Button>
                                    </td>
                                    <td><ViewMail type={"sent"} /></td>                  
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>

    );
};

export default Sent;