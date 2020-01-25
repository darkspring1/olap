import * as React from "react";

 
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
 
import Button from 'devextreme-react/button';

export interface HelloProps { compiler: string; }

//export const Hello = (props: HelloProps) => <h1>Hello from {props.compiler}!</h1>;


export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (
            <Button
                text={this.props.compiler}
            />
        );
    }
 
    sayHelloWorld() {
        alert('Hello world!')
    }
}