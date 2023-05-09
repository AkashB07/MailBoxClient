import { useRef, useState } from "react";
import { Button,  Form } from "react-bootstrap";
import { convertToRaw, EditorState } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";

import { mailActions } from "../../store/mail-slice";

const url = 'http://localhost';

const Compose = (props) => {

    const dispatch = useDispatch();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const token = useSelector(state => state.auth.token);
    // const { sentMail } = useSelector((state) => state.mail);

    const emailRef = useRef();
    const subjectRef = useRef();

    const onEditorChange = (currEditorState) => {
        setEditorState(currEditorState);
    };


    const composeMailHandler = async (event) => {
        try {
            event.preventDefault();
            const mailDetails = {
                to: emailRef.current.value,
                subject: subjectRef.current.value,
                body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
                isRead: false,
            };

            const transformData = (data) => {
                const newData = [data];
                dispatch(mailActions.updateSentMail({ mail: newData }));
            };

            const respone = await axios.post(`${url}:4000/mail/send`, mailDetails, { headers: { "Authorization": token } });

            if (respone.status === 200) {
                transformData(respone.data.mails);
                alert(respone.data.message);
                emailRef.current.value = '';
                subjectRef.current.value = '';
                setEditorState(EditorState.createEmpty());
                // navigate('/home');
            }
            else {
                throw new Error('Failed to send mail');
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-10" ><br /><br />
                <Form onSubmit={composeMailHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <label><strong>Email Address</strong></label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                            ref={emailRef}
                            required
                        />
                    </Form.Group><br />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <label><strong>Subject</strong></label>
                        <Form.Control
                            type="text"
                            placeholder="subject"
                            autoFocus
                            ref={subjectRef}
                            required
                        />
                    </Form.Group><br />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <label><strong>Message</strong></label>
                        <div
                            style={{
                                overflow: "scroll",
                                backgroundColor: "lightgray",
                                height: "40vw"
                            }}
                        >
                            <Editor
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorChange}
                            />
                        </div>
                    </Form.Group><br />
                    <div className="text-center" >
                        <Button variant="primary" type="submit">Send</Button>
                    </div><br />
                </Form><br />
            </div>
        </div>
    );
};

export default Compose;