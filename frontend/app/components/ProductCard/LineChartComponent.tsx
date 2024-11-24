"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DataPoint {
	monthDay: string;
	bestBuy: number;
	walmart: number;
}

interface LineChartComponentProps {
	data: DataPoint[]; // Define the type for the data prop
}

class LineChartComponent extends React.Component<LineChartComponentProps> {
	constructor(props: LineChartComponentProps) {
		super(props);
	}

	render() {
		const { data } = this.props; // Access the data from props

		return (
			<div className="w-full h-72">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data} margin={{ right: 30 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="monthDay" /> {/* Changed "monthDay" to "month" */}
						<YAxis domain={["auto", "auto"]} />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="bestbuy" stroke="#3F6212" />
						<Line type="monotone" dataKey="walmart" stroke="#3D85C6" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		);
	}
}

export default LineChartComponent;
