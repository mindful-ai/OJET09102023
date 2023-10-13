import { h } from "preact";
import { useState, useCallback } from "preact/hooks";

import "ojs/ojinputnumber";
import "ojs/ojinputtext";
import "ojs/ojradioset";
import "ojs/ojbutton";
import { ojButton } from "ojs/ojbutton";
import { ojRadioset } from "ojs/ojradioset";

export function Content(){

    var [val1, setVal1] = useState(0);
    var [val2, setVal2] = useState(0);
    var [opValue, setOpValue] = useState('add');
    var [result, setResult] = useState(0);
    //var opValue = 'add';

    const updateVal1 = useCallback( (event: any) => {
        setVal1(event.target.value);
        calculateResult();
        console.log("Input 1 current value -> ", event.target.value);
    }, [val1, setVal1])

    const updateVal2 = useCallback( (event: any) => {
        setVal2(event.target.value);
        calculateResult();
        console.log("Input 2 current value -> ", event.target.value);
    }, [val2, setVal2])

    const updateRadioButtonChoice = (event: any, op: string) => {
        setOpValue(event.target.value);
        calculateResult();
        console.log("Radio button current value -> ", op);
    };
    
    const calculateResult = () => {
        var res: number = 0;
        switch(opValue){
            case "add": {res = val1 + val2; break;}
            case "sub": {res = val1 - val2; break;}
            case "mul": {res = val1 * val2; break;}
            case "div": {res = val1 / val2; break;}
        }
        setResult(res);
        console.log("Val1 -> ", val1, "Val2 -> ", val2, "Op -> ", opValue,  "Result -> ", res);
    };

    const onChangeValue = (event) => {
        console.log(event.target.value);
    }
  
    return(
      <div style="border: 2px solid black; border-radius: 10px; padding: 5%; margin 5%">
            <h3>Calculator Project</h3>
            <div style="width: 50%; border: 1px solid black; margin: 2%; padding: 2%; border-radius: 10px;">
            <oj-label for="inputnumber-id1">Operand A</oj-label>
            <oj-input-number
                id="inputnumber-id1"
                min={0}
                max={100}
                step={1}
                value={val1}
                onvalueChanged={updateVal1}
                label-hint="min=0, max=100, step=0"
                label-edge="inside"></oj-input-number>
            <div style="height: 20px"></div>
            <oj-label for="inputnumber-id2">Operand A</oj-label>
            <oj-input-number
                id="inputnumber-id2"
                min={0}
                max={100}
                step={1}
                value={val2}
                onvalueChanged={updateVal2}
                label-hint="min=0, max=100, step=0"
                label-edge="inside"></oj-input-number>
            <div style="height: 20px"></div>
            <oj-label for="inputnumber-id2">Operations</oj-label>
            
            {/*
            <div onChange={onChangeValue}>
                <input type="radio" name="ops" value="add"></input>Add
                <input type="radio" name="ops" value="sub"></input>Subtract
                <input type="radio" name="ops" value="mul"></input>Multiply
                <input type="radio" name="ops" value="div"></input>Divide
            </div>
            */}

            {/* Considering the behaviour, radio buttons should be used 
                where the behaviour is not a problem. It behaviour can
                be safely utilized in forms. But, do not expect knockout like 
                behaviour in TSX environment, atleast in it's current state */}

            <oj-radioset
              id="radiosetBasic"
              value={opValue}
              onClick={(e) => updateRadioButtonChoice(e, opValue)}>
              <oj-option value={"add"} >{'Add'}</oj-option>
              <oj-option value={"sub"} >{'Subtract'}</oj-option>
              <oj-option value={"mul"} >{'Multiply'}</oj-option>
              <oj-option value={"div"} >{'Divide'}</oj-option>
            </oj-radioset>
            
            <div style="height: 20px"></div>

            <oj-button id="button1" onojAction={calculateResult} class="oj-button-sm" label="Result">Result</oj-button>
            <h3>{result}</h3>

            

        </div>
      </div>
    )
  }
