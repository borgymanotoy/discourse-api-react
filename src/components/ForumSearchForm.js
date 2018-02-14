import React, { Component } from 'react';
//import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import axios from 'axios';
import qs from "qs";

class ForumSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {action: 'https://discourse-api-ticket.herokuapp.com/api/forum-ticket', forum: 'https://meta.discourse.org/t/limit-one-post-per-person/80072', key: '', ticketDetails:null};
        this.handleForumChange = this.handleForumChange.bind(this);
        this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleForumChange(event) {
        this.setState({ forum: event.target.value });
    }

    handleApiKeyChange(event) {
        this.setState({ key: event.target.value });
    }

    handleSubmit(event) {
        const axiosInstance = axios.create({
            baseURL: this.state.action,
            timeout: 600000
        });

        const params = {
            forum: this.state.forum,
            key: this.state.key
        };

        const self = this;

        axiosInstance({
            method: 'post',
            url: this.state.action,
            data: qs.stringify(params)
        })
        .then(function (response) {
            console.log(response);
            self.setState({ ticketDetails: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });

        event.preventDefault();
    }

    render() {
        if (!this.state.ticketDetails) {
            return(
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <label className="col-lg-4 display-4" htmlFor="forum">Forum Link:</label>
                        <input type="text" id="forum" value={this.state.forum} onChange={this.handleForumChange} className="col-lg-8" />
                    </div>
                    <div className="row">
                        <label className="col-lg-4 display-4" htmlFor="forum">API Key:</label>
                        <input type="text" id="forum" value={this.state.key} onChange={this.handleApiKeyChange} className="col-lg-8" />
                    </div>
                    <div className="row">
                        <button className="btn btn-primary">Check Forum Topic</button>
                    </div>
                </form>
            );
        } else {

            function TableRow(obj) {
                return (
                    <tr>
                        <td>
                            <div className="historyItem">
                                <span className="historyItemMessage">{obj.message}</span>
                                <span className="historyItemUser">{obj.user}</span>
                                <span className="historyItemDate">{obj.date}</span>
                                <span className="historyItemLink"><a href={obj.link} target="_blank">{obj.link}</a></span>
                            </div>
                        </td>
                    </tr>
                );
            }

            var emailItems = [];
            var emails = this.state.ticketDetails.emailAddresses;
            if (emails) {
                for (var i = 0; i < emails.length; i++) {
                    emailItems.push(<li>{emails[i]}</li>);
                }
            }

            var historyItems = [];
            var history = this.state.ticketDetails.history;
            if (history) {
                for (var i = 0; i < history.length; i++) {
                    var obj = history[i];
                    historyItems.push(<TableRow message={obj.message} user={obj.user} date={obj.date} link={obj.link} />);
                }
            }

            return(
                <div align="left">
                    <h3><strong>Ticket Details</strong></h3>
                    <hr/>
                    <div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Subject</strong></span>
                            <span className="col-lg-8 field">{this.state.ticketDetails.subject}</span>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Topic Date</strong></span>
                            <span className="col-lg-8 field">{this.state.ticketDetails.topicDate}</span>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Forum Link</strong></span>
                            <span className="col-lg-8 field"><a href={this.state.ticketDetails.forumLink} target="_blank">{this.state.ticketDetails.forumLink}</a></span>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Contact:</strong></span>
                            <span className="col-lg-8 field">{this.state.ticketDetails.contactName ? this.state.ticketDetails.contactName : "n/a"}</span>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Emails:</strong></span>
                            <ul className="col-lg-8">
                                {emailItems}
                            </ul>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Type:</strong></span>
                            <span className="col-lg-8 field">{this.state.ticketDetails.type ? this.state.ticketDetails.type : "n/a"}</span>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Serial Number:</strong></span>
                            <span className="col-lg-8 field">{this.state.ticketDetails.serialNo ? this.state.ticketDetails.serialNo : "n/a"}</span>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>Details:</strong></span>
                            <span className="col-lg-8 field">{this.state.ticketDetails.details ? this.state.ticketDetails.details : "n/a"}</span>
                        </div>
                        <div className="row">
                            <span className="col-lg-4 field fieldLabel"><strong>History:</strong></span>
                            <table className="col-lg-8">
                                <tbody>
                                    {historyItems}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <a href="/" className="btn btn-primary btn-lg">Back</a>
                </div>
            );
        }

    }
}

export default ForumSearchForm;