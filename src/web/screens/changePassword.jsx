import React from "react";
import {FullScreenLayout, Screen} from "../components/layout";
import M from "../../strings";
import {changePassword} from "../../actions/account";

export default class ChangePassword extends Screen {

    constructor(props) {
        super(props)

        this.state = {};
    }

    changePassword() {
        changePassword({password: this.state.password, passwordConfirm: this.state.passwordConfirm})
    }

    updatePassword(value) {
        this.state.password = value.target.value;
    }

    updatePasswordConfirm(value) {
        this.state.passwordConfirm = value.target.value;
    }

    render() {
        return (
            <FullScreenLayout>
                <div className="login">
                    <div className="login__block active" id="l-lockscreen">
                        <div className="login__block__header">
                            <i className="zmdi zmdi-account-circle"></i>
                            {M("changePasswordDescription")}
                        </div>
                        <div className="lcb-form" ref="changePassword_form">
                            <div className="login__block__body">

                                <div className="form-group form-group--float form-group--centered">
                                    <input type="password" onChange={this.updatePassword.bind(this)} name="password" className="form-control" placeholder={M("password")}/>
                                    <i className="form-group__bar"></i>
                                </div>

                                <div className="form-group form-group--float form-group--centered">
                                    <input type="password" name="confirmPassword"  onChange={this.updatePasswordConfirm.bind(this)} className="form-control" placeholder={M("passwordConfirm")}/>
                                    <i className="form-group__bar"></i>
                                </div>

                                <a href="javascript:;" onClick={this.changePassword.bind(this)} className="btn btn-login btn-ponzio btn-float waves-effect waves-circle waves-float"><i className="zmdi zmdi-arrow-forward"></i></a>
                            </div>
                        </div>

                    </div>
                </div>

            </FullScreenLayout>
        )
    }

}


