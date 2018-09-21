"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _materialUiDatatables = require("material-ui-datatables");

var _materialUiDatatables2 = _interopRequireDefault(_materialUiDatatables);

var _Card = require("material-ui/Card");

var _Popover  = require("material-ui/Popover");

var _PopoverAnimationVertical  = require("material-ui/Popover");

var _FlatButton  = require("material-ui/FlatButton");

var _SelectField = require("material-ui/SelectField");

var _Menu = require("material-ui/Menu");

var _formats = require("utils/formats");

var _IconButton = require('material-ui/IconButton');

var _IconMenu = require('material-ui/IconMenu');

var _MenuItem = require('material-ui/MenuItem');

var _DeleteIcon = require('material-ui/svg-icons/action/delete');

var _ActivaIcon = require('material-ui/svg-icons/action/history');

var _EditIcon = require('material-ui/svg-icons/image/edit');

var _MoreVertIcon = require ('material-ui/svg-icons/navigation/more-vert');


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = function (_Component) {
    _inherits(DataTable, _Component);

    function DataTable(props, context) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props, context));

        _initialiseProps.call(_this);

        _this.handleChangeValueFilter = _this.handleChangeValueFilter.bind(_this);
        _this.handlePrevPage = _this.handlePrevPage.bind(_this);
        _this.handleNextPage = _this.handleNextPage.bind(_this);
        _this.handleRowSelect = _this.handleRowSelect.bind(_this);
        _this.handleSortOrderChange = _this.handleSortOrderChange.bind(_this);
        _this.handleChangeRowSize = _this.handleChangeRowSize.bind(_this);
        _this.handleClickDelete = _this.handleClickDelete.bind(_this);
        _this.handleClickActive = _this.handleClickActive.bind(_this);
        _this.handleClickEdit = _this.handleClickEdit.bind(_this);
        _this.handleClickEditES = _this.handleClickEditES.bind(_this);
        _this.handleClickBashPF = _this.handleClickBashPF.bind(_this);
        _this.handleClickBashUP = _this.handleClickBashUP.bind(_this);
        _this.handleClickBashUS = _this.handleClickBashUS.bind(_this);
        _this.handleRequestClose = _this.handleRequestClose.bind(_this);
        _this.handleChangeEmpresa = _this.handleChangeEmpresa.bind(_this);
        _this.handleChangeSucursal = _this.handleChangeSucursal.bind(_this);
        _this.oneElementAdded = false;
        _this.rows = [];
	    _this.dataInicial = [];
        _this.selectFinal = [];

        var rowSizeList = [10, 25, 50, 100];

        _this.state = {
            "data": _this.props.data,
            "openES":false,
            "Empresa":-1,
            "Sucursal":-1,
            "anchorEl": null,
            "currentPage": 1,
            "rowSize": rowSizeList[0],
            "rowSizeList": rowSizeList,
            "filterText": "",
            "limitPage": _this.getLimitPage(_this.props.data.length, rowSizeList[0]),
            "realSelections": _this.getInitialSelected(),
            "controlsTable":[{
                "edith": false,
                "edithES": false,
                "delete": false,
                "active": false,
                "bash":false,
                "bashFac": false,
                "bashProf":false,
                "bashSuc":false
            }]
        };

        return _this;
    }

    return DataTable;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.state = {};
    this.componentWillReceiveProps=function(nextProps){

            _this2.dataInicial= nextProps.data;

        /*if (nextProps.objeto!==this.props.objeto||nextProps.arbolMenu!==this.props.arbolMenu){

            this.muestraCampos(nextProps.arbolMenu, nextProps.objeto);
        }*/
    };

    this.componentWillUpdate = function (nextProps, nextState) {

        var data = nextProps.data,
            resetSelected = nextProps.resetSelected,
            lengthCurrentData = _this2.props.data.length,
            lengthNextData = data.length,
            rowSize = _this2.state.rowSize;
        
        if (resetSelected !== _this2.props.resetSelected) {

            _this2.setState({
                "realSelections": []
            });
        }
        let result = JSON.stringify(_this2.state.controlsTable[0])===JSON.stringify(nextProps.toolbarControls[0])
        
        if(result===false){

            _this2.setState({                
                "controlsTable":[{
                    "edith": nextProps.toolbarControls[0].edith,
                    "edithES": nextProps.toolbarControls[0].edithES,
                    "delete": nextProps.toolbarControls[0].delete,
                    "active": nextProps.toolbarControls[0].active,
                    "bash":nextProps.toolbarControls[0].bash,
                    "bashFac": nextProps.toolbarControls[0].bashFac,
                    "bashProf":nextProps.toolbarControls[0].bashProf,
                    "bashSuc":nextProps.toolbarControls[0].bashSuc
                }]
            });

        }

        if (lengthNextData !== lengthCurrentData) {

            var page = void 0;

            switch (lengthNextData - lengthCurrentData) {

                case 1:
                    page = _this2.state.currentPage;
                    _this2.oneElementAdded = true;
                    break;

                case -1:
                    page = _this2.state.currentPage;
                    _this2.oneElementAdded = true;
                    break;

                default:
                    page = 1;
                    _this2.oneElementAdded = false;
                    break;

            }

            _this2.setState({
                "data": data,
                "limitPage": _this2.getLimitPage(data.length, rowSize),
                "currentPage": page,
                "filterText": "",
                "realSelections": _this2.getInitialSelected()
            });
        }
    };

    this.getLimitPage = function (lengthNextData, rowSize) {

        var limitPage = parseInt(lengthNextData / rowSize, 10);

        if (lengthNextData % 10 !== 0) {

            limitPage += 1;
        }
        return limitPage;
    };

    this.getInitialSelected = function () {

        var _props = _this2.props,
            selectableManually = _props.selectableManually,
            data = this.state.data;
        var selections = [];

        if (selectableManually) {

            selections = _this2.getSelectedByAttr(data);
        }

        return selections;
    };

    this.handleNextPage = function () {
        var _state = _this2.state,
            currentPage = _state.currentPage,
            limitPage = _state.limitPage;


        if (currentPage + 1 > limitPage) {

            return;
        }
        _this2.oneElementAdded = false;
        _this2.setState({ 
            "currentPage": currentPage + 1
        });
    };

    this.handlePrevPage = function () {
        var currentPage = _this2.state.currentPage;


        if (currentPage - 1 <= 0) {

            return;
        }
        _this2.oneElementAdded = false;
        _this2.setState({ 
            "currentPage": currentPage - 1
        });
    };

    this.handleChangeValueFilter = function (value) {

        _this2.oneElementAdded = false;
        _this2.setState({
            "currentPage": 1,
            "filterText": value.trim().toLowerCase()
        });
    };

    this.handleChangeRowSize = function (index) {
        var _state2 = _this2.state,
            rowSizeList = _state2.rowSizeList,
            currentPage = _state2.currentPage,
            data = _state2.data;


        var limit = _this2.getLimitPage(data.length, rowSizeList[index]),
            obj = {
                "rowSize": rowSizeList[index],
                "limitPage": limit
            };

        if (currentPage > limit) {

            obj.currentPage = limit;
        }

        _this2.setState(obj);
    };

    this.handleSortOrderChange = function (column, order) {

        let items = this.state.data;
        items.sort(function (a, b) {

            if (a[column] > b[column]) {
                return (order==="asc" ? 1 : -1);
            }
            if (a[column] < b[column]) {
                return (order==="asc" ? -1 : 1);
            }
            return 0;
        });

        _this2.setState({
            "data": items,
	        "realSelections": _this2.getInitialSelected()
        });
    };

    this.handleRowSelect = function (selection) {        
        
        var _props2 = _this2.props,
            onRowSelection = _props2.onRowSelection,
            data = this.state.data,
            selectableManually = _props2.selectableManually;
        var realSelections = _this2.state.realSelections,
            responseArray = false;

        switch (selection) {

            case "all":
                
                selection = [];
                data.map(function (d, index) {
                    realSelections.push(index);    
                    selection.push(index);                                       
                });
                responseArray = false;
                break;

            case "none":
                realSelections = [];
                responseArray = false;
                break;

            default:

                responseArray = true;
                    if (_this2.rows.length===1){
                        realSelections.push(0);
                    }else{
                        selection.map(function (item) {
                            if(data.length > 0){                                                        
                                data.map(function (d, index) {                                                             
                                    if (_this2.rows[item].index === index) {                    
                                        realSelections.push(index);
                                    }/*else if (_this2.rows.length===1){
                                        realSelections.push(0);
                                    }*/
                                });                                
                            }else{
                                realSelections = [];
                            }
                        });
                    }
                break;

        }
        
        realSelections = [].concat(_toConsumableArray(new Set(realSelections)));
        
        let idx = []
        let j = 0;
        _this2.selectFinal=[];
        if (!responseArray) {
            realSelections = _this2.removeNotExist(realSelections, selection);        
            _this2.selectFinal=selection;
            onRowSelection(selection);

        } else {            
           
            realSelections = _this2.removeNotExist(realSelections, selection);                        
            for(let i=0;i<realSelections.length;i++){
                _this2.dataInicial.map(function (d, index) {                                                
                    if(data[realSelections[i]]===d){                    
                        idx[j]=index;                    
                        j++;
                    }
                });        
            }

            _this2.selectFinal=idx;
            onRowSelection(idx);
            
        }
        
        
        if (!selectableManually) {
            
            _this2.setState({
                "realSelections": realSelections,
                "controlsTable":[{
                    "edith": _this2.props.toolbarControls[0].edith,
                    "delete": _this2.props.toolbarControls[0].delete,
                    "active": _this2.props.toolbarControls[0].active,
                    "bash": _this2.props.toolbarControls[0].bash,
                    "bashFac":  _this2.props.toolbarControls[0].bashFac,
                    "bashProf": _this2.props.toolbarControls[0].bashProf,
                    "bashSuc": _this2.props.toolbarControls[0].bashSuc
                }]
            });

        }


    };

    this.handleClickDelete = function () {
        var _props2 = _this2.props,
            onRowDelete = _props2.onRowDelete,
            data = this.state.data;
        var dataResp=this.state.data;        
        var positions = _this2.selectFinal;
        onRowDelete(positions);
        /*
         data.map(function (item, index) {

         positions.map(function (item2, index2) {
         if (index===item2){

         dataResp.splice(item2, 1);
         }
         });
         });

         _this2.setState({
         data: dataResp,
         realSelections: []
         })*/
    };

    this.handleClickActive = function () {
        var _props2 = _this2.props,
            onRowActive = _props2.onRowActive;
        var positions = _this2.selectFinal
        onRowActive(positions);      
    };

    this.handleClickEdit = function () {
        var _props2 = _this2.props,
            onRowEdith = _props2.onRowEdith,
            data = this.state.data;
        var positions = _this2.selectFinal
        onRowEdith(positions);
    };
    this.handleClickEditES = function (event) {    
        event.preventDefault();
        _this2.setState({
            "openES": true,
            "anchorEl":event.currentTarget
        });
        
    };
    this.handleRequestClose = function () {
        _this2.setState({
            "openES": false,
            "Empresa": -1,    
            "Sucursal": -1
        });
        
    }; 
    this.handleChangeEmpresa = function (event, index, value) {
        
        _this2.setState({
            "Empresa": value           
        });

        var _props2 = _this2.props,
            onSelectBusiness = _props2.onSelectBusiness,
            data = this.state.data;
        onSelectBusiness(value);
        
    };  
    this.handleChangeSucursal = function (event, index, value) {
        
        _this2.setState({
            "Sucursal": value           
        });
    }; 
    
      
    this.handleClickBashPF = function () {
        var _props2 = _this2.props,
            onClickBashPF = _props2.onClickBashPF,
            data = this.state.data;
        onClickBashPF();
    };
    this.handleClickBashUP = function () {
        var _props2 = _this2.props,
            onClickBashUP = _props2.onClickBashUP,
            data = this.state.data;
        onClickBashUP();
    };
    
    this.handleClickBashUS = function () {
        var _props2 = _this2.props,
            onClickBashUS = _props2.onClickBashUS,
            data = this.state.data;
        onClickBashUS();
    };
    this.removeNotExist = function (realSelections, selectionOnPage) {
        var rowSize = _this2.state.rowSize;

        var indexNotExist = void 0,
            limit = 0;

        if (realSelections.length > 0) {

            if (_this2.rows.length < rowSize) {

                limit = _this2.rows.length;
            } else {

                limit = rowSize;
            }

            var _loop = function _loop(i) {
                
                if (typeof selectionOnPage.find(function (s) {
                        return i === s;
                    }) === "undefined") {

                    indexNotExist = realSelections.indexOf(_this2.rows[i].index);

                    if (indexNotExist > -1) {

                        realSelections.splice(indexNotExist, 1);
                    }
                }
            };

            for (var i = 0; i < limit; i += 1) {
                _loop(i);
            }
        }

        return realSelections;
    };

    this.getRowsWithFormat = function (rows) {
        var headers = _this2.props.headers;


        return rows.map(function (row) {

            for (var i = 0; i < headers.length; i += 1) {
                var _headers$i = headers[i],
                    key = _headers$i.key,
                    type = _headers$i.type,
                    labelBtn = _headers$i.labelBtn,
                    format = _headers$i.format,
                    unix = _headers$i.unix,
                    _headers$i$renderFals = _headers$i.renderFalseAs,
                    renderFalseAs = _headers$i$renderFals === undefined ? (0, _formats.getRenderBoolean)() : _headers$i$renderFals,
                    _headers$i$renderTrue = _headers$i.renderTrueAs,
                    renderTrueAs = _headers$i$renderTrue === undefined ? (0, _formats.getRenderBoolean)(true) : _headers$i$renderTrue;


                if (type === "date" && row[key]) {

                    row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                        "$set": (0, _formats.getDateFormat)({
                            "format": format,
                            "isUnix": unix,
                            "value": row[key]
                        })
                    }));
                }

                if (type === "boolean") {

                    row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                        "$set": row[key] ? renderTrueAs : renderFalseAs
                    }));
                }

                if (type === "currency") {

                    row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                        "$set": (0, _formats.getCurrencyFormat)(row[key])
                    }));
                }

                if (type === "link") {

                    row = (0, _immutabilityHelper2.default)(row, _defineProperty({}, key, {
                        "$set": (0, _formats.getLinkFormat)(row[key], labelBtn)
                    }));
                }
            }

            return row;
        });
    };

    this.getRowsWithCurrentPage = function (rows) {
        var _state3 = _this2.state,
            currentPage = _state3.currentPage,
            rowSize = _state3.rowSize;


        var indexFinal = rowSize,
            indexInitial = 0;

        if (currentPage === 1) {

            indexInitial = 0;
        } else {

            indexInitial = (currentPage - 1) * rowSize;
            indexFinal = currentPage * rowSize;
        }

        return rows.filter(function (row, index) {

            return index >= indexInitial && index < indexFinal;
        });
    };

    this.getRowsWithFilterText = function (rows) {
        var headers = _this2.props.headers,
            filterText = _this2.state.filterText;


        return rows.filter(function (row) {

            for (var i = 0; i < headers.length; i += 1) {
                var _headers$i2 = headers[i],
                    key = _headers$i2.key,
                    sortable = _headers$i2.sortable;


                if (typeof row[key] !== "undefined" && sortable) {

                    var stringValue = row[key].toString();
                    stringValue = stringValue.toLowerCase();

                    if (stringValue.includes(filterText)) {

                        return true;
                    }
                }
            }

            return false;
        });
    };

    this.getSelectedRowsOnDT = function (rows) {
        var realSelections = _this2.state.realSelections;
        
        var selected = [];

        rows.map(function (row, index) {

            realSelections.map(function (rs) {
                
                if (row.index === rs) {

                    selected.push(index);
                }
            });
        });

        return selected;
    };

    this.getSelectedByAttr = function (rows) {
        var attrSelectable = _this2.props.attrSelectable;


        var selected = [];

        rows.map(function (row, index) {

            if (row[attrSelectable]) {

                selected.push(index);
            }
        });

        return selected;
    };

    this.pushElement = function (rows) {
        var data = this.state.data;        

        if (data.length > 0 && !rows.find(function (row) {
                return row === data[data.length - 1];
            })) {
            
            rows = [data[data.length - 1]].concat(_toConsumableArray(rows));
            rows.pop();
            
        }
        
        return rows;
    };

    this.getTable = function () {
        var _props3 = _this2.props,
            title = _props3.title,
            selectable = _props3.selectable,
            headers = _props3.headers,
            showCheckboxes = _props3.showCheckboxes,
            selectableManually = _props3.selectableManually,
            enableSelectAll = _props3.enableSelectAll,
            multiSelectable = _props3.multiSelectable,
            showFooterToolbar = _props3.showFooterToolbar,
            showHeaderToolbar = _props3.showHeaderToolbar,
            _state4 = _this2.state,
            data = _state4.data,
            currentPage = _state4.currentPage,
            rowSize = _state4.rowSize,
            filterText = _state4.filterText,
            rowSizeList = _state4.rowSizeList;


        var selectedRows = [];
        
        if (data instanceof Array) {            
            _this2.rows = data.map(function (d, index) {
                return Object.assign({}, d, { index: index });
            });            
        } else {            
            _this2.rows = [];
        }
        
        if (filterText.length > 0) {

            _this2.rows = _this2.getRowsWithFilterText(_this2.rows);
        }
        
        _this2.rows = _this2.getRowsWithCurrentPage(_this2.rows);

        /*if (_this2.oneElementAdded) {

            _this2.rows = _this2.pushElement(_this2.rows);
        } */       
        
        _this2.rows = _this2.getRowsWithFormat(_this2.rows);
        
        if (selectable) {
            
            if (selectableManually) {

                selectedRows = _this2.getSelectedByAttr(_this2.rows);
            } else {
                
                selectedRows = _this2.getSelectedRowsOnDT(_this2.rows);
            }
        };




        var IconDelete=_react2.default.createElement(_DeleteIcon.default, {});
        var IconActive=_react2.default.createElement(_ActivaIcon.default, {});
        
        if(_state4.controlsTable[0].edithES===true){
            var IconEdit=_react2.default.createElement(_EditIcon.default,{});
            var IconEditPopover=_react2.default.createElement(
                _EditIcon.default, 
                {
                    color: "#E91E63"    
                },                
            );
        }else{
            var IconEdit=_react2.default.createElement(_EditIcon.default, {});
        }


        var toolbarIconRight=[];

        var MenuItemsEmpresa0 = _react2.default.createElement(
            _MenuItem.default, {
                primaryText: 'Seleccione una empresa',
                value:-1
            }
        );
        
        var selectEmpresa=_react2.default.createElement(
            _SelectField.default, 
            {                
                floatingLabelText:"Empresa *",
                value: _state4.Empresa,
                onChange: _this2.handleChangeEmpresa,
                autoWidth:true
            },
            MenuItemsEmpresa0,_this2.props.business            
        ); 
        
        var MenuItemsSucursal0 = _react2.default.createElement(
            _MenuItem.default, {
                primaryText: 'Seleccione una sucursal',
                value:-1
            }
        );

        var selectSucursal=_react2.default.createElement(
            _SelectField.default, 
            {
                floatingLabelText:"Seleccione una sucursal",
                value: _state4.Sucursal,
                onChange: _this2.handleChangeSucursal,
                
            },
            MenuItemsSucursal0,_this2.props.branchOffices
            
        );  

        var _PopoverEdith=_react2.default.createElement(
            _Popover.Popover, 
            {
                open:_state4.openES,                   
                anchorEl: _state4.anchorEl,
                anchorOrigin: {horizontal:'left',vertical:'bottom'},
                targetOrigin: {horizontal:'right',vertical:'top'},
                onRequestClose:_this2.handleRequestClose,
                style:{
                    display:"flex",
                    overflow: "hidden"
                }
            },
            _react2.default.createElement(
                "div",
                { 
                    className:"row"
                }  
            ),
            _react2.default.createElement(
                "div",
                { 
                    className:"row"
                },
                _react2.default.createElement(
                    "div",
                    { 
                        className:"col s12",
                        style:{
                            fontWeight: "bold"
                        }
                    },
                    "Actualizar Empresa"
                )  
            ),
            _react2.default.createElement(
                "div",
                { 
                    className:"row"
                },
                _react2.default.createElement(
                    "div",
                    { 
                        className:"col s1",
                        style:{
                            paddingTop: "6%"
                        }
                    },
                    IconEditPopover
                ),
                _react2.default.createElement(
                    "div",
                    { 
                        className:"col s5"
                    },
                    selectEmpresa
                ),
                _react2.default.createElement(
                    "div",
                    { 
                        className:"col s1",
                        style:{
                            paddingTop: "6%"
                        }
                    },
                    IconEditPopover
                ),
                _react2.default.createElement(
                    "div",
                    { 
                        className:"col s5"
                    },
                    selectSucursal
                )

            ), 
            _react2.default.createElement(
                "div",
                { 
                    className:"row"
                },
                _react2.default.createElement(
                    "div",
                    { 
                        className:"col s2 offset-s7",
                        
                    },
                    _react2.default.createElement(
                        _FlatButton.default, {
                            label: 'CANCELAR',                            
                            onClick: _this2.handleRequestClose
                        }
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { 
                        className:"col"
                    },
                    _react2.default.createElement(
                        _FlatButton.default, {
                            label: 'GUARDAR',
                            primary:true,
                            labelStyle:{color:"#478ECC"}
                        }
                    )
                ),
            ) 

        );
    
        
      

        var MenuItems2 = _react2.default.createElement(
            _MenuItem.default, {
                primaryText: 'Administrar Facultades',
                onTouchTap: _this2.handleClickBashPF
            }
        );
        var MenuItems = _react2.default.createElement(
            _MenuItem.default, {
                primaryText: 'Administrar Perfiles',
                onTouchTap: _this2.handleClickBashUP
            }
        );
        var MenuItems3 = _react2.default.createElement(
            _MenuItem.default, {
                primaryText: 'Administrar Surcursales',
                onTouchTap: _this2.handleClickBashUS
            }
        );

        var IconMoreVert=_react2.default.createElement(_MoreVertIcon.default, {});
        var IconButtonMoreVert=_react2.default.createElement(
            _IconButton.default,
            {
                children: IconMoreVert,
                tooltip: "Más opciones"
            }
        );
        let estatus=(data.length>0&&_state4.realSelections.length>0)?data[_state4.realSelections[0]].estatus:"";

        if (_state4.realSelections.length===1){

            let band = false;
           
            if(_state4.controlsTable[0].edithES===true){

                toolbarIconRight.push(_react2.default.createElement(
                    _IconButton.default,
                    {
                        onTouchTap: _this2.handleClickEditES,
                        tooltip:"Editar",
                        
                    },
                    _react2.default.createElement(
                        "div",
                        null,
                        IconEdit,_PopoverEdith
                    )  
                ));
                band = true;
            }

            if(_state4.controlsTable[0].edith===true){
                toolbarIconRight.push(_react2.default.createElement(
                    _IconButton.default,
                    {
                        onTouchTap: _this2.handleClickEdit,
                        tooltip:"Editar"
                    },
                    IconEdit
                ));
                band = true;
            }

            if(_state4.controlsTable[0].delete===true&&estatus==="ACTIVO"){
                toolbarIconRight.push(_react2.default.createElement(
                    _IconButton.default,
                    {
                        onTouchTap: _this2.handleClickDelete,
                        tooltip:"Borrar"
                    },
                    IconDelete
                ));
                band = true;
            }

            if(_state4.controlsTable[0].active===true&&estatus==="INACTIVO"){
                toolbarIconRight.push(_react2.default.createElement(
                    _IconButton.default,
                    {
                        onTouchTap: _this2.handleClickActive,
                        tooltip:"Activar"
                    },
                    IconActive
                ));
                band = true;
            }

            if(_state4.controlsTable[0].bash===true){

                toolbarIconRight.push(_react2.default.createElement(
                    _IconMenu.default,
                    {
                        iconButtonElement : IconButtonMoreVert,
                        anchorOrigin:{horizontal: 'right', vertical: 'top'},
                        targetOrigin:{horizontal: 'right', vertical: 'top'},
                    },
                    _state4.controlsTable[0].bashFac===true?MenuItems2:null,
                    _state4.controlsTable[0].bashProf===true?MenuItems:null,
                    _state4.controlsTable[0].bashSuc===true?MenuItems3:null

                ));
                band = true;
            }
            if(!band){
                toolbarIconRight="";
            }


        }else if (_state4.realSelections.length>1){

            let iconDA="", func="";
            if (estatus==="ACTIVO"){

                iconDA=IconDelete;
                func=_this2.handleClickDelete

            }else if (estatus==="INACTIVO"){
                iconDA=IconActive;
                func=_this2.handleClickActive
            }
            toolbarIconRight.push(_react2.default.createElement(_IconButton.default, {
                onTouchTap: func,
                children: iconDA
            }));
        }else{toolbarIconRight=""}




        return _react2.default.createElement(_materialUiDatatables2.default, {
            height: "auto",
            selectable: selectable,
            showRowHover: true,
            columns: headers,
            data: _this2.rows,
            
            tableBodyStyle: {"overflowX" : "auto"},
            showCheckboxes: showCheckboxes,
            enableSelectAll: enableSelectAll,
            multiSelectable: multiSelectable,
            showHeaderToolbar: showHeaderToolbar,
            onRowSelection: _this2.handleRowSelect,
            tableStyle: {
                "tableLayout": "auto"
            },
            titleStyle:{
                "color": "#FFFFFF",
                "fontFamily": "Roboto-Regular",
                "fontSize": "16px",
                "lineHeight": "14px"
            },            
            onFilterValueChange: _this2.handleChangeValueFilter,
            page: currentPage,
            filterHintText: "Buscar en la tabla",
            count: data.length,
            selectedRows: selectedRows,
            rowSize: rowSize,
            rowSizeLabel: "Registros por página",
            rowSizeList: rowSizeList,
            showRowSizeControls: true,
            showFooterToolbar: showFooterToolbar,
            onRowSizeChange: _this2.handleChangeRowSize,
            onSortOrderChange: _this2.handleSortOrderChange,
            onNextPageClick: _this2.handleNextPage,
            onPreviousPageClick: _this2.handlePrevPage,
            toolbarIconRight: toolbarIconRight,
            title: title && title });
    };

    this.render = function () {        
        var card = _this2.props.card;
        
        return _react2.default.createElement(
            "div",
            null,
            card && _react2.default.createElement(_Card.Card, {
                style: {
                    
                    "overflowY" : "hidden",
                    "overflowX" : "auto",
                    "minWidth": "325px",
                    "maxWidth": "1350px",
                    "backgroundColor":"red"
                },
                children: _this2.getTable() }),
            !card && _this2.getTable()
        );
    };
};

exports.default = DataTable;

DataTable.propTypes = {
    "onRowSelection": _propTypes2.default.func,
    "onRowDelete": _propTypes2.default.func,
    "onRowActive": _propTypes2.default.func,
    "onRowEdith": _propTypes2.default.func,
    "onClickBashPF": _propTypes2.default.func,
    "onSelectBusiness": _propTypes2.default.func,
    "onClickBashUP": _propTypes2.default.func,
    "onClickBashUS": _propTypes2.default.func,
    "selectable": _propTypes2.default.bool,
    "selectableManually": _propTypes2.default.bool,
    "resetSelected": _propTypes2.default.bool,
    "attrSelectable": _propTypes2.default.string,
    "card": _propTypes2.default.bool,
    "showHeaderToolbar": _propTypes2.default.bool,
    "enableSelectAll": _propTypes2.default.bool,
    "showCheckboxes": _propTypes2.default.bool,
    "showFooterToolbar": _propTypes2.default.bool,
    "multiSelectable": _propTypes2.default.bool,
    "title": _propTypes2.default.string,
    "data": _propTypes2.default.array.isRequired,
    "headers": _propTypes2.default.array.isRequired
};

DataTable.defaultProps = {
    "data": [],
    "selectable": false,
    "card": true,
    "showCheckboxes": false,
    "resetSelected": false,
    "selectableManually": false,
    "showHeaderToolbar": true,
    "showFooterToolbar": true,
    "enableSelectAll": false,
    "multiSelectable": false
};
