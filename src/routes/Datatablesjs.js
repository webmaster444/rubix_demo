import React from 'react';
import ReactDOM from 'react-dom';
import LabelBtn from '../common/LabelBtn';

import {
	Row,
	Col,
	Grid,
	Panel,
	Table,
	PanelBody,
	PanelHeader,
	FormControl,
	PanelContainer,
	Checkbox,
	FormGroup,
	Label,
	Button,
} from '@sketchpixy/rubix';

import testdata from '../common/testdata.js';
import settings from '../settings.js';

class DatatableComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	render_table(data){
		return $('#hometable')
			.addClass('nowrap')
			.dataTable({
				responsive: true,
				// data: testdata.tabledata,
				data: data,
				columns: [
					{ data: null},
					{ data: 'uploaded_timestamp'},
					{ data: 'file_size'},
					{  
						data: 'tags',
						render: function(data, type, full, meta){
							let stateColor = null;
							switch(data){
								case 'driving': stateColor = 'rgb(255, 140, 33)'; break;
								case 'Crowd': stateColor = 'rgb(248, 106, 103)'; break;
								case 'Vehicle': stateColor = 'rgb(101, 191, 90)'; break;
								default: stateColor = 'rgb(91, 192, 222)';
							}
							return '<div class="label_container" style="background:'+stateColor+'">'+data+'</div>'
						}
					},
					{ data: 'original_file_name'},
				],
				'columnDefs': [
					{
						'targets': 0,
						'width': '10',
						'searchable': false,
						'orderable': false,
						'className': 'dt-body-center',
						'render': function(data, type, full, meta){
							return '<input type="checkbox" />';
						}
					}
				],
				'order': [[1, 'asc']]
		});
	}
	componentDidMount() {
		const tableObj = this.render_table(this.props.data);
		this.props.setTableObj(tableObj);
		this.tableCustomInit();
		// download button disable
		$('#downloadBtn').attr('disabled', true);
	}
	tableCustomInit(){
		const self = this;
		// Handle click on "Select all" control
		$('#hometable-select-all').on('click', function(){
			// Get all rows with search applied
			var rows = self.props.tableObj.api().rows({ 'search': 'applied' }).nodes();
			// Check/uncheck checkboxes for all rows in the table
			$('input[type="checkbox"]', rows).prop('checked', this.checked);
		});

		// Handle click on checkbox to set state of "Select all" control
		$('#hometable tbody').on('change', 'input[type="checkbox"]', function(){
			// If checkbox is not checked
			if(!this.checked){
				 var el = $('#hometable-select-all').get(0);
				 // If "Select all" control is checked and has 'indeterminate' property
				 if(el && el.checked && ('indeterminate' in el)){
						// Set visual state of "Select all" control 
						// as 'indeterminate'
						el.indeterminate = true;
				 }
			}
		});
		///show one row detail////
		$('#hometable tbody').on( 'click', 'tr', function () {
			const onerowdata =  self.props.tableObj.api().row( this ).data();
			self.props.setDetailData(onerowdata);
		});
	}
	render() {
		return (
			<Table className='display' cellSpacing='0' width='100%' id="hometable">
				<thead>
					<tr>
						<th><input type="checkbox" name="select_all" value="1" id="hometable-select-all" /></th>
						<th>Upload Time</th>
						<th>Size</th>
						<th>Tag</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody ref={(tbody) => this.tbody = tbody}>
				</tbody>
			</Table>
		);
	}
}

export default class Datatablesjs extends React.Component {
	constructor(props) {
		super(props);
		this.onClickDownload = this.onClickDownload.bind(this);
		this.state = {
			selectedCount: 0,
		}
	}
	componentDidMount() {
		this.tableCustomInit();
	}
	tableCustomInit(){
		const self = this;
		//set count
		$('#hometable').on('change', 'input[type="checkbox"]', function(){
			const countchecked = self.props.tableObj.api()
					.rows()
					.nodes()
					.to$()      // Convert to a jQuery object
					.find('input[type="checkbox"]:checked').length;
			self.setState({selectedCount: countchecked});
			//disable download button when none selected
			if(countchecked == 0) $('#downloadBtn').attr('disabled', true);
			else $('#downloadBtn').attr('disabled', false);
		});
		//set hightlight
		$('#hometable tbody').on('click', 'tr', function(){
			$('#hometable tbody tr').removeClass('selected');
			$(this).addClass('selected');
		});
		
	}
	onClickDownload(){
		const self = this;
		const checkedObj = self.props.tableObj.api()
					.rows()
					.nodes()
					.to$()      // Convert to a jQuery object
					.find('input[type="checkbox"]:checked').parent();
		const rows_selected = this.props.tableObj.api().rows(checkedObj).data();
		$.each(rows_selected, function(index, row){
			var form = new FormData();
			form.append("file_name", row.file_name);
			form.append("uploader_id", row.uploader_id);
			form.append("auth_token", "uTDfRK4WPtpchbr3mHsIsftXmBlw6VWVakHvPiIGWoc=");
			form.append("security_context", "imda-stee-vpp");

			$.ajax({
				"method": "POST",
				"crossDomain": true,
				"dataType": 'json',
				"processData": false,
				"contentType": false,
				"mimeType": "multipart/form-data",
				"url": settings.apiBase+"/api/v1/download",
				"data": form
			})
			.done(function (response) {
				// console.log(response);
				var uri = settings.apiBase+'/'+response.file_url;
				var link = document.createElement('a');
				link.href = uri;
				link.style = 'visibility: hidden';
				link.download = 'true'
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			})
			.fail(function( jqXHR, textStatus ) {
				Messenger({
					extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-left'
				}).post({
					type: 'error',
					singleton: false,
					showCloseButton: true,
					message: "Request failed: " + textStatus
				});
			});
		});

	}
	render() {
		return (
			<div className="maintable">
				<DatatableComponent
					data={this.props.tableData}
					tableObj={this.props.tableObj}
					setTableObj = {this.props.setTableObj}
					setDetailData={this.props.setDetailData}
				/>
				<div className="footer">
					<div className="selected_count">
						{this.state.selectedCount}  row(s) selected
					</div>
					<Button onClick={this.onClickDownload} id="downloadBtn">
						Download
					</Button>
				</div>
			</div>
		);
	}
}
