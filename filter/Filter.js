var Filter = React.createClass({
    displayName: 'Filter',

    propTypes: {
        strList: React.PropTypes.arrayOf(String),
    },

    getInitialState: function() {
        return { 
            textvalue: "", // содержимое поля для ввода текстового фильтра
            isReset: false, // флаг нажатия кнопки Сброс
            checkbox: false, // состояние чекбокса
            strListPrev: this.props.strList, // предыдущее состояние списка
            strListS: this.props.strList,  // текущее состояние списка
        };
      },

    btnReset: function(EO) {
        this.setState( (prevState, props) => { 
            var newArr = this.props.strList;
            return {checkbox: false, strListS: newArr, strListPrev: newArr, isReset: true, textvalue: ""}; 
        } );
    },

    chbSort: function(EO) {
        var checked = EO.target.checked;
        this.setState( (prevState, props) => { 
            var prevArr = [];
            var newArr = [];
            if (checked) {
                prevArr = prevState.strListS.slice(); 
                newArr = prevState.strListS.slice().sort();
            }
            else {
                prevArr = this.props.strList;
                newArr = this.props.strList;
            }
            return {checkbox: checked, strListS: newArr, strListPrev: prevArr}; 
        } );
    },

    inpChange: function(EO) {
        var strStart = EO.target.value;
        this.setState( (prevState, props) => { 
            var newArr = this.filter(strStart, props.strList, prevState.strListS);
            return {strListS: newArr, textvalue: strStart}; 
        } );
    },

    filter: function(strStart, arrDefault, arrFilter) {
        var newArr = [];
        if (strStart=="") {
            newArr = arrDefault.slice(); // props.strList;
        }
        else {
            newArr = arrFilter.filter(v => v.indexOf(strStart)>-1); // prevState.strListS.filter(v => v.indexOf(strStart)>-1);
        }
        return newArr; 
    },

    render: function() {
        var list = this.state.strListS.map( v => React.DOM.div({key:v,className:'List'}, React.DOM.span({className:'Text'},v),));

        return React.DOM.div( {className:'Filter'}, 
        React.DOM.input({type:'checkbox',name:'isSort',onClick:this.chbSort, onChange:this.chbSort, checked:(this.state.checkbox), value: this.state.checkbox}),
        React.DOM.input({type:'text',name:'filtertext',onChange:this.inpChange, value:this.state.textvalue}),
        React.DOM.input({type:'button',value:'Сброс',onClick:this.btnReset}),
        list,
        );
    },
});