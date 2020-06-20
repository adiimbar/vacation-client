import axios from 'axios'; 

import React,{Component} from 'react'; 
import apiService from '../../services/api.service';


interface State {
    selectedFile: any
}

class Example extends Component<any, State> { 


    public constructor(props: any) {
        super(props);

        this.state = {
            selectedFile: null
        }
    }
	
	// On file select (from the pop up) 
	onFileChange = (event: any) => { 
	
	// Update the state 
	this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
	// Create an object of formData 
	const formData = new FormData(); 
	
	// Update the formData object 
	formData.append( 
		"myFile", 
		this.state.selectedFile, 
		this.state.selectedFile.name 
	); 
	
	// Details of the uploaded file 
	console.log(this.state.selectedFile); 
	
	// Request made to the backend api 
    // Send formData object 
    console.log(formData);
    this.uploadFile(formData) 

	// axios.post("api/uploadfile", formData); 
	}; 
    
    async uploadFile(formData: any) {
        console.log(formData);
        const response = await apiService.post("uploads", formData);
        console.log(response);
        // store.dispatch({ type: ActionType.AddUserFollow, payload: response.data});
    }
	// File content to be displayed after 
	// file upload is complete 
	// fileData = () => { 
	
	// if (this.state.selectedFile) { 
		
	// 	return ( 
	// 	<div> 
	// 		<h2>File Details:</h2> 
	// 		<p>File Name: {this.state.selectedFile.name}</p> 
	// 		<p>File Type: {this.state.selectedFile.type}</p> 
	// 		<p> 
	// 		Last Modified:{" "} 
	// 		{this.state.selectedFile.lastModifiedDate.toDateString()} 
	// 		</p> 
	// 	</div> 
	// 	); 
	// } else { 
	// 	return ( 
	// 	<div> 
	// 		<br /> 
	// 		<h4>Choose before Pressing the Upload button</h4> 
	// 	</div> 
	// 	); 
	// } 
	// }; 
	
	render() { 
	
	return ( 
		<div> 
			<div> 
				<input type="file" onChange={this.onFileChange} /> 
				<button onClick={this.onFileUpload}> 
				Upload! 
				</button> 
			</div> 
		{/* {this.fileData()}  */}
		</div> 
	); 
	} 
} 

export default Example; 
