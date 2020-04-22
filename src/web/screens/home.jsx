import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
const { Screen, Layout } = require("../components/layout")
const Secure = require("../components/secure")
import Services from "../../api/genericApi"
import Colors from "../../model/colors";
import { optional } from "../../utils/lang";

const Widgets = (props) => {
    const [counters, setCounters] = useState({});

    useEffect(() => {

        Services.get("dashboard/data")
            .then((response) => {
                const me = ReactDOM.findDOMNode(this);
                const counters = response.value;

                $('.sparkline-bar-stats').sparkline('html', {
                    type: 'bar',
                    height: 36,
                    barWidth: 3,
                    barColor: '#fff',
                    barSpacing: 2
                });

                var testsData = [
                    {data: counters.positiveTests, color: Colors.error, label: "Positivi"},
                    {data: counters.negativeTests, color: Colors.success, label: "Negativi"},
                    {data: counters.unknownTests, color: Colors.warning, label: "Non effettuati"},
                ];

                var profilesData = [
                    {data: counters.familyMembers, color: "#03A9F4", label: "Familiari"},
                    {data: counters.parents, color: "#f5c942", label: "Utenti"},
                ];
                
                // Pie Chart
                if($('.flot-pie')[0]){
                    $.plot('.flot-pie', testsData, {
                        series: {
                            pie: {
                                show: true,
                                stroke: {
                                    width: 2
                                }
                            }
                        },
                        legend: {
                            container: '.flot-chart-legend--pie',
                            backgroundOpacity: 0.5,
                            noColumns: 0,
                            backgroundColor: "white",
                            lineWidth: 0,
                            labelBoxBorderColor: '#fff'
                        }
                    });
                }
                
                // Donut Chart
                if($('.flot-donut')[0]){
                    $.plot('.flot-donut', profilesData, {
                        series: {
                            pie: {
                                innerRadius: 0.5,
                                show: true,
                                stroke: { 
                                    width: 2
                                }
                            }
                        },
                        legend: {
                            container: '.flot-chart-legend--donut',
                            backgroundOpacity: 0.5,
                            noColumns: 0,
                            backgroundColor: "white",
                            lineWidth: 0,
                            labelBoxBorderColor: '#fff'
                        }
                    });
                }

                setCounters(counters);
            })
            .catch(e => console.error(e));


    

    }, []);

    return <>
        <header className="content__title">
            <h1>Cov-ID</h1>
            <small>Dashboard di gestione e consultazione attività Cov-ID</small>

            <div className="actions">
                <a href="" className="actions__item zmdi zmdi-trending-up"></a>
                <a href="" className="actions__item zmdi zmdi-check-all"></a>

                <div className="dropdown actions__item">
                    <i data-toggle="dropdown" className="zmdi zmdi-more-vert"></i>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a href="" className="dropdown-item">Refresh</a>
                        <a href="" className="dropdown-item">Manage Widgets</a>
                        <a href="" className="dropdown-item">Settings</a>
                    </div>
                </div>
            </div>
        </header>

        <div className="row quick-stats">
            <div className="col-sm-6 col-md-3">
                <div className="quick-stats__item bg-blue">
                    <div className="quick-stats__info">
                        <h2>{optional(counters.parents, 0)}</h2>
                        <small>Utenti registrati</small>
                    </div>

                    <div className="quick-stats__chart sparkline-bar-stats">6,4,8,6,5,6,7,8,3,5,9,5</div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3">
                <div className="quick-stats__item bg-amber">
                    <div className="quick-stats__info">
                        <h2>{optional(counters.familyMembers, 0)}</h2>
                        <small>Familiari censiti</small>
                    </div>

                    <div className="quick-stats__chart sparkline-bar-stats">6,4,8,6,5,6,7,8,3,5,9,5</div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3">
                <div className="quick-stats__item bg-purple">
                    <div className="quick-stats__info">
                        <h2>{optional(counters.contacts, 0)}</h2>
                        <small>Contatti registrati</small>
                    </div>

                    <div className="quick-stats__chart sparkline-bar-stats">6,4,8,6,5,6,7,8,3,5,9,5</div>
                </div>
            </div>

            <div className="col-sm-6 col-md-3">
                <div className="quick-stats__item bg-red">
                    <div className="quick-stats__info">
                        <h2>{optional(counters.positiveTests, 0)}</h2>
                        <small>Tamponi positivi</small>
                    </div>

                    <div className="quick-stats__chart sparkline-bar-stats">6,4,8,6,5,6,7,8,3,5,9,5</div>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Grafico tamponi</h4>

                        <div className="flot-chart flot-pie"></div>
                        <div className="flot-chart-legends flot-chart-legend--pie"></div>
                    </div>
                </div>
            </div>

            <div className="col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Grafico utenti</h4>

                        <div className="flot-chart flot-donut"></div>
                        <div className="flot-chart-legends flot-chart-legend--donut"></div>
                    </div>
                </div>
            </div>
        </div>

        

                        
    </>
}

export default class Home extends Screen {

    render() {
        return (
            <Secure>
                <Layout>
                    
                        <Widgets />

                </Layout>
            </Secure>
        )
    }
}

