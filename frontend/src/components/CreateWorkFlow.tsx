import { useState, useCallback } from 'react';
import {ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge,  MiniMap , Background , Controls} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {TrrigerSheet} from "../components/TrrigerSheet.tsx";

import {PriceTrigger, type PriceNodeMetaData} from "@/nodes/trigger/PriceTrigger.tsx";
import {Timer, type TimeNodeMetaData} from "@/nodes/trigger/timer.tsx";
import { Lighter, type TradingMetadata } from '@/nodes/actions/Lighter.tsx';
import { ActionSheet } from './ActionSheet.tsx';
import { Backpack } from '@/nodes/actions/BackPack.tsx';
import { HyperLiquid } from '@/nodes/actions/HyperLiquid.tsx';

const nodeTypes = {
    "price-trigger":PriceTrigger,
    "timer":Timer,
    "Lighter":Lighter,
    "backpack":Backpack,
    "hyperLiquid":HyperLiquid
  };


export type KindType ="price-trigger" | "timer" | "hyperLiquid" | "backpack" | "Lighter";

export  type NodeMetaData=TradingMetadata | PriceNodeMetaData | TimeNodeMetaData;

interface NodeType{
    type: KindType,
    data:{
        // this defines which trigger is the action and which is a trigger or which is action first is action and second is trigger
        kind:"action" | "trigger",
        metadata: NodeMetaData,
       // label:string

    //label
    }
    
    //for stating the postition  of the genrate block
    id: string, position: { x:number, y: number }
}

interface Edge{ id: string , source:string, target: string }
export function CreateWorkFlow() {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    // edge componet block
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectAction, setselectetAction] = useState<{
        position: {
            x: number;
            y: number;
        };
        startingNodeId: string;
    } | null>(null);
    

    const onNodesChange = useCallback(
        (changes:any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes:any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params:any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );
    const Std=50
    const onConnectEnd= useCallback(
        (params, connectionInfo)=>{
            
            if(!connectionInfo.isValid){
                setselectetAction({
                    startingNodeId: connectionInfo.fromNode.id,
                    position: {
                        x:connectionInfo.from.x +Std,
                        y:connectionInfo.from.y+Std
                    }
                    
                });              
                console.log(connectionInfo.fromNode.id);
                console.log(connectionInfo.fromNode.to);
            }
        },[]
    )

    return (

        <div style={{ width: '100vw', height: '100vh' }}>
            {JSON.stringify(nodes)}
           
            {!nodes.length && <TrrigerSheet onSelect={({type, metadata}) => {
                 setNodes([...nodes, {
                    id: Math.random().toString(),
                    type,
                    data: {
                        kind: "trigger",
                        metadata,
                        // label:kind,
                    },
                    position: {x: 40, y: 0},
                }]);}}/>
                }
                {selectAction && <ActionSheet onSelect={({type, metadata}) => {
                    const nodeID= Math.random().toString()
                 setNodes([...nodes, {
                    id: nodeID ,
                    type,
                    data: {
                        kind: "action",
                        metadata,
                        // label:kind,
                    },
                    position: selectAction.position,
                }]);
                setEdges([ ...edges,{
                      id: `${selectAction.startingNodeId}-${nodeID}`,
                      source: selectAction.startingNodeId,
                      target: nodeID,
                    }
                  ])
                  setselectetAction(null)
                }}/>}
            <ReactFlow
                nodeTypes={nodeTypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectEnd={onConnectEnd}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1}></Background>

            </ReactFlow>

        </div>
    );
}
export default CreateWorkFlow;

