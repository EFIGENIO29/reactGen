/**
 * 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'underscore';
/** Material-UI */
import {Card, CardHeader, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
/** Redux actions */
import * as ConfigurationActions from 'actions/common/configuration';
/** Custom Constants */
import {selectOptionsSIF} from 'constants/configuration';
/** Custom styles */
const styles = {
    withOutPadding: {
        paddingTop: '0',
        paddingBottom: '0'
    }
};

@connect((store) => {
    return {
        companySIF: store.commonConfiguration.companySIF
    };
})

class SelectFieldCompanySIF extends Component {
    constructor(props) {
        super(props);
        // Component state
        this.state = {
            selectedOption: false,
            company: this.props.companySIF
        };
    }
    /**
     * 
     */
    _handleSelectFieldOnChange = (event, index, value) => {
        if ( this.props.saveOnChange === true ) {
            this.props.dispatch(ConfigurationActions.updateSIF(value));
        } else {
            this.props.dispatch(ConfigurationActions.updateTemporalSIF(value));
        }
        this.setState({
            selectedOption: true,
            company: value
        });
    }
    render() {
        // Change the title
        let title = 'SIF';
        let subTitle = 'Sistema Integral FINDEP';
        if ( this.props.showTitle === false ) {
            title = subTitle;
            subTitle = null;
        }
        console.log('SELECTCOMPANYSIF',this.state);
        return (
            <Card style={{boxShadow: 0}}>
                <CardHeader
                    title={title}
                    subtitle={subTitle}
                    actAsExpander={false}
                    showExpandableButton={false}
                    style={styles.withOutPadding}
                    />
                <CardText expandable={false} style={styles.withOutPadding}>
                    <SelectField
                        floatingLabelText="Seleccionar empresa"
                        value={this.state.company}
                        onChange={this._handleSelectFieldOnChange}
                        errorText={(this.state.company === null && this.state.selectedOption === true) && 'Debe seleccionar una opción'}
                        maxHeight={this.props.height}
                        style={styles.withOutPadding}
                        >
                            {/* Sort the options alphabetically */}
                            {_.sortBy(selectOptionsSIF, (o) => { return o.text; }).map((element, index) => {
                                return  <MenuItem key={index} value={element.value} primaryText={element.text} />;
                            })}
                    </SelectField>
                </CardText>
            </Card>
        );
    }
}
SelectFieldCompanySIF.propTypes = {
    height: PropTypes.number,
    saveOnChange: PropTypes.bool,
    showTitle: PropTypes.bool,
};
SelectFieldCompanySIF.defaultProps = {
    height: 100,
    saveOnChange: true,
    showTitle: true,
};
export default SelectFieldCompanySIF;
