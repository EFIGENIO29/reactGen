/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

import _ from 'underscore';
import moment from 'moment';

@connect((store) => {
    return {
        accessLog: store.commonAuth.accessLog,
    };
})

/**
 * 
 */
class AccessLog extends Component {
  constructor (props) {
    super(props);
  }
  render() {
        let rows = [];
        if ( _.size(this.props.accessLog) > 0 ) {
            rows = this.props.accessLog.map((row, index) => {
                return <TableRow key={index}>
                        <TableRowColumn>{row.idBitacora}</TableRowColumn>
                        <TableRowColumn>{row.ipAddress}</TableRowColumn>
                        <TableRowColumn>{moment(row.fechaUltimoAcceso).format()}</TableRowColumn>
                    </TableRow>;
            });
        }
      return (
        <Card>
            <CardHeader
            title="Bitácora de acceso"
            actAsExpander={true}
            showExpandableButton={true}
            />
            <CardText expandable={true}>
                <div className='row'>
                    <div className='col m12'>
                        <Table>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                >
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>IP</TableHeaderColumn>
                                    <TableHeaderColumn>Fecha</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={false}
                                >
                                {rows}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardText>
        </Card>
      );
  }
}
export default AccessLog;
