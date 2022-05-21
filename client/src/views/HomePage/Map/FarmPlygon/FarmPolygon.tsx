import { circle, LatLngExpression } from 'leaflet';
import React, { useState, useEffect } from 'react';
import { TileLayer, FeatureGroup, Circle, Polygon } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"

interface IProps {
    polygon: LatLngExpression[];
    setPolygon: (positions: LatLngExpression[]) => void;
}


const FarmPolygon = (props: IProps) => {
    const { polygon, setPolygon }  = props;

    const onEdited = (e: any) => {
        // TODO Update the original polygon
        // console.log('edited', e.layers._layers['72'].getLatLngs())
        // setPolygon(e.layers._layers['72'].getLatLngs()) 
    }

    const onCreated = (e: any) => {
        // TODO Alow to create only one polygon
        console.log('created', e.layer.getLatLngs())
        // setPolygon(e.layer.getLatLngs())
        
    }

    const onDeleted = (e: any) => {
        console.log('deleted', e)
    }

    return (
        <FeatureGroup>
            <EditControl
                position='topleft'
                onEdited={onEdited}
                onCreated={onCreated}
                onDeleted={onDeleted}
                draw={{
                    rectangle: false,
                    circle: false,
                    circlemarker: false,
                    polyline: false,
                    marker: false,
                }}
            />
            <Polygon 
                positions={polygon}
            />
        </FeatureGroup>
    )
}

export default FarmPolygon;