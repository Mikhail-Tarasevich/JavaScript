var Filter = React.createClass({
    displayName: 'Filter',

    propTypes: {
        strList: React.PropTypes.arrayOf(String),
    },

    getInitialState: function() {
        return { 
            checkbox: false,
            strListPrev: this.props.strList, // предыдущее состояние списка
            strListS: this.props.strList,  // ntreott состояние списка
        };
      },

    btnReset: function(EO) {
        this.setState( (prevState, props) => { 
            var newArr = props.strList;
            return {checkbox: false, strListS: newArr, strListPrev: newArr}; 
        } );
    },

    chbSort: function(EO) {
        var checked = EO.target.checked;
        this.setState( (prevState, props) => { 
            var prevArr = [];
            var newArr = [];
            if (checked) {
                prevArr = prevState.strListS.slice();; 
                newArr = prevState.strListS.sort();;
            }
            else {
                prevArr = prevState.strListPrev;
                newArr = prevState.strListPrev;
            }
            return {checkbox: checked, strListS: newArr, strListPrev: prevArr}; 
        } );
    },

    inpChange: function(EO) {
        var strStart = EO.target.value;
        this.setState( (prevState, props) => { 
            var newArr = [];
            if (strStart=="") {
                newArr = props.strList;
            }
            else {
                newArr = prevState.strListS.filter(v => v.indexOf(strStart)>-1);
            }
            return {strListS: newArr}; 
        } );
    },

    render: function() {
        console.log("render");

        var list = this.state.strListS.map( v => React.DOM.div({key:v,className:'List'}, React.DOM.span({className:'Text'},v),));
        //var checkbox = (this.state.checkbox)?;
        
        return React.DOM.div( {className:'Filter'}, 
        React.DOM.input({type:'checkbox',name:'isSort',onClick:this.chbSort}),
        React.DOM.input({type:'text',name:'filtertext',onChange:this.inpChange}),
        React.DOM.input({type:'button',value:'Сброс',onClick:this.btnReset}),
        list,
        );
    },
});