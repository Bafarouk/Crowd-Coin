import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

class requestNew extends Component {
  state = {
    description: "",
    amount: "",
    recipient: "",
    errMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const instance = campaign(this.props.address);
    const { description, amount, recipient } = this.state;

    this.setState({ errMessage: "", loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({
          from: accounts[0],
        });
    } catch (err) {
      this.setState({ errMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Request </h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              value={this.state.amount}
              onChange={(event) =>
                this.setState({ amount: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(event) =>
                this.setState({ recipient: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errMessage} />

          <Button loading={this.state.loading} primary>
            {" "}
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default requestNew;
