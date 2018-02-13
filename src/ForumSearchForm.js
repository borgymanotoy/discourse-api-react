import React, { Component } from 'react';
//import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios';
import axios from 'axios';
import qs from "qs";

class ForumSearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {action: 'http://localhost:8080/api/forum-ticket', forum: 'http://testforum.peplink.com/t/welcome-to-discourse/8/4', key: '9b4e8c82beab1c7cf3e679037bb7beee446db5f8865ffa641236021b6b45e8bf', ticketDetails:null};
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

        axiosInstance({
            method: 'post',
            url: this.state.action,
            data: qs.stringify(params)
        })
        .then(function (response) {
            console.log(response);
            this.setState({ ticketDetails: response.data });
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
            return(
                <h1>Ticket Details Data Available</h1>
            );
        }

    }
}

export default ForumSearchForm;