import React, { Component } from "react";
import web3 from "../../ethereum/web3";
import campaign from "../../ethereum/campaign";
import Layout from "../../components/Layout";
import { Button, Card, Grid } from "semantic-ui-react";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const instance = campaign(props.query.address);

    const campaignDetail = await instance.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: campaignDetail[0],
      balance: campaignDetail[1],
      requestsCount: campaignDetail[2],
      approversCount: campaignDetail[3],
      manager: campaignDetail[4],
    };
  }

  renderCards() {
    const {
      minimumContribution,
      manager,
      approversCount,
      balance,
      requestsCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of the manager",
        description:
          "The manager created this campaign and can create requests to withdraw money.",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: "you must contribute a minimum of 100 wei.",
      },
      {
        header: requestsCount,
        meta: "Number of requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers.",
      },
      {
        header: approversCount,
        meta: "Number of approvers",
        description:
          "Number of people who have already donated to this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3> Campaign details show </h3>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary>View Requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
