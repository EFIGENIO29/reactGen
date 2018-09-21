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
import {selectOptionsSIC} from 'constants/configuration';
/** Custom styles */
const styles = {
    withOutPadding: {
        paddingTop: '0',
        paddingBottom: '0'
    }
};

@connect((store) => {
    return {
        companySIC: store.commonConfiguration.companySIC
    };
})

class SelectFieldCompanySIC extends Component {
    constructor(props) {
        super(props);
        // Component state
        this.state = {
            selectedOption: false,
            company: this.props.companySIC
        };
    }
    /**
     * 
     */
    _handleSelectFieldOnChange = (event, index, value) => {
        if ( this.props.saveOnChange === true ) {
            this.props.dispatch(ConfigurationActions.updateSIC(value));
        } else {
            this.props.dispatch(ConfigurationActions.updateTemporalSIC(value));
        }
        this.setState({
            selectedOption: true,
            company: value
        });
    }
    render() {
        // Change the title
        let title = 'SIC';
        let subTitle = 'Sistema Integral Centralizado';
        if ( this.props.showTitle === false ) {
            title = subTitle;
            subTitle = null;
        }
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
                            {_.sortBy(selectOptionsSIC, (o) => { return o.text; }).map((element, index) => {
                                return  <MenuItem key={index} value={element.value} primaryText={element.text} />;
                            })}
                    </SelectField>
                </CardText>
            </Card>
        );
    }
}
SelectFieldCompanySIC.propTypes = {
    height: PropTypes.number,
    saveOnChange: PropTypes.bool,
    showTitle: PropTypes.bool,
};
SelectFieldCompanySIC.defaultProps = {
    height: 100,
    saveOnChange: true,
    showTitle: true,
};
export default SelectFieldCompanySIC;
