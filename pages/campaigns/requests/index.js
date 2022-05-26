import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import { Button, Table } from "semantic-ui-react";
import campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/requestRow";

class requestsIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const instance = campaign(address);
    const requestCount = await instance.methods.getRequestsLength().call();
    const approversCount = await instance.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return instance.methods.requests(index).call();
        })
    );

    return { address, requests, approversCount, instance, requestCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <h1>Requests</h1>
        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              {" "}
              create request
            </Button>
          </a>
        </Link>

        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Receipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.requestCount} requests.</div>
      </Layout>
    );
  }
}

export default requestsIndex;
