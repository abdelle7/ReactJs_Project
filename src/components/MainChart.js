import React from "react";
import { Line } from "react-chartjs-2";
import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Progress,
  Button,
  ButtonToolbar,
  CardTitle,
  CardFooter,
  Row
} from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
// import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

// const brandSuccess = getStyle('--success')
// const brandInfo = getStyle('--info')
// const brandDanger = getStyle('--danger')

// Card Chart 1
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: [
    "Lu",
    "Ma",
    "Me",
    "Je",
    "Ve",
    "Sa",
    "Di",
    "Lu",
    "Ma",
    "Me",
    "Je",
    "Ve",
    "Sa",
    "Di",
    "Lu",
    "Ma",
    "Me",
    "Je",
    "Ve",
    "Sa",
    "Di",
    "Lu",
    "Ma",
    "Me",
    "Je",
    "Ve",
    "Sa",
    "Di"
  ],
  datasets: [
    {
      label: "Mes Premiers données",
      backgroundColor: "rgba(99, 194, 222,0.1)",
      borderColor: "rgba(99, 194, 222)",
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1
    },
    {
      label: "Mes deuxième données",
      backgroundColor: "transparent",
      borderColor: "green",
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data2
    },
    {
      label: "Mes troisième données",
      backgroundColor: "transparent",
      borderColor: "red",
      pointHoverBackgroundColor: "#fff",
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return {
          backgroundColor:
            chart.data.datasets[tooltipItem.datasetIndex].borderColor
        };
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

class MainChart extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0" style={{ color: "black" }}>
                      Traffic
                    </CardTitle>
                    <div className="small text-muted">Octobre 2019</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    {/* <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button> */}
                    <ButtonToolbar
                      className="float-right"
                      aria-label="Toolbar with button groups"
                    >
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(1)}
                          active={this.state.radioSelected === 1}
                        >
                          Jour
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(2)}
                          active={this.state.radioSelected === 2}
                        >
                          Mois
                        </Button>
                        <Button
                          color="outline-secondary"
                          onClick={() => this.onRadioBtnClick(3)}
                          active={this.state.radioSelected === 3}
                        >
                          Année
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div
                  className="chart-wrapper"
                  style={{ height: 300 + "px", marginTop: 40 + "px" }}
                >
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Visites</div>
                    <strong style={{ color: "black" }}>
                      29.703 utilisateurs (40%)
                    </strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="success"
                      value="40"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Unique</div>
                    <strong style={{ color: "black" }}>
                      24.093 utilisateurs (20%)
                    </strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="info"
                      value="20"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Pages vues</div>
                    <strong style={{ color: "black" }}>
                      78.706 vues (60%)
                    </strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="warning"
                      value="60"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Nouveaux utilisateurs</div>
                    <strong style={{ color: "black" }}>
                      22.123 utilisateurs (80%)
                    </strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="danger"
                      value="80"
                    />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Taux de rebond</div>
                    <strong style={{ color: "black" }}>
                      Taux moyen (40.15%)
                    </strong>
                    <Progress
                      className="progress-xs mt-2"
                      color="primary"
                      value="40"
                    />
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default MainChart;
