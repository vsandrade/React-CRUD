import React, { Component } from "react";
import TransactionForm from "./TransactionForm";
import { connect } from "react-redux";
import * as actions from "../actions/transactionActions";
import { bindActionCreators } from "redux";

class TransactionList extends Component {
  state = {
    currentIndex: -1,
    list: this.returnList()
  };

  returnList() {
    if (localStorage.getItem("transactions") == null)
      localStorage.setItem("transactions", JSON.stringify([]));

    return JSON.parse(localStorage.getItem("transactions"));
  }

  onAddOrEdit = data => {
    var list = this.returnList();

    if (this.state.currentIndex === -1) list.push(data);
    else list[this.state.currentIndex] = data;

    localStorage.setItem("transactions", JSON.stringify(list));
    this.setState({ list, currentIndex: -1 });
  };

  handleEdit = index => {
    this.props.updateTransactionIndex(index)
  };

  handleDelete = index => {
    this.props.deleteTransaction(index);
  };

  render() {
    return (
      <div>
        <TransactionForm />
        <hr />
        <table>
          <tbody>
            {this.props.list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.bAccountNo}</td>
                  <td>{item.iFSC}</td>
                  <td>{item.bName}</td>
                  <td>{item.amount}</td>
                  <td>
                    <button onClick={() => this.handleEdit(index)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => this.handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({
    deleteTransaction: actions.Delete,
    updateTransactionIndex: actions.UpdateIndex
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
