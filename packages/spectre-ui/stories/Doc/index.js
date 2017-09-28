import "spectre.css";
import "spectre.css/docs/css/docs.css";
import React from "react";
import propTypes from "../tmp/types";
import exampleCode from "../tmp/code";
import "./highlight.css";

const Doc = ({ title, desc, children }) => (
	<div className="s-content">
		<div className="container">
			{title && <h3 className="s-title">{title}</h3>}
			{desc && (
				<div className="docs-note">
					<p>{desc}</p>
				</div>
			)}
		</div>
		{children}
	</div>
);
Doc.displayName = "Doc";

export const DocSection = ({ title, children }) => (
	<div>
		<div className="container">
			{title && (
				<h4 id="buttons-sizes" className="s-subtitle">
					{title}
				</h4>
			)}
		</div>
		{children}
	</div>
);
DocSection.displayName = "DocSection";

export const DocElement = ({ children }) => (
	<div className="columns">
		<div className="column col-xs-12">{children}</div>
	</div>
);
DocElement.displayName = "DocElement";

export const DocCode = ({ id }) => {
	if (!exampleCode[id]) {
		return <div />;
	}
	return (
		<pre className="code" data-lang="JSX">
			<code dangerouslySetInnerHTML={{ __html: exampleCode[id] }} />
		</pre>
	);
};
DocCode.displayName = "DocCode";

export const DocPropsType = ({ prop }) => {
	if (!propTypes[prop]) {
		return <div />;
	}
	const type = propTypes[prop];
	const stylesTitle = {
		paddingTop: "2rem",
		paddingBottom: "1rem",
	};

	if (type.type === "string (enum)") {
		return (
			<div>
				<h6 className="s-subtitle" style={stylesTitle}>
					{type.name}
				</h6>
				<table className="docs-table table table-striped text-center">
					<thead>
						<tr>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="text-left">enum({type.value})</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	if (type.type !== "object") {
		return (
			<div>
				<h6 className="s-subtitle" style={stylesTitle}>
					{type.name}
				</h6>
				<table className="docs-table table table-striped text-center">
					<thead>
						<tr>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="text-left">{type.value}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div>
			<h6 className="s-subtitle" style={stylesTitle}>
				{type.name}
			</h6>
			<table className="docs-table table table-striped text-center">
				<thead>
					<tr>
						<th>Name</th>
						<th>Required</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					{type.values.map(value => (
						<tr key={value.name}>
							<td className="text-left">{value.name}</td>
							<td>
								{value.required ? (
									<div className="bg-primary docs-dot" />
								) : (
									<div className="bg-secondary docs-dot" />
								)}
							</td>
							<td className="text-left">{value.type}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
DocCode.displayName = "DocPropsType";

export const DocProps = ({ props }) => (
	<div className="container">
		<div className="columns">
			<div className="column col-xs-12">
				{props.map((prop, index) => (
					<DocPropsType key={`${prop.name}-${index}`} prop={prop} />
				))}
			</div>
		</div>
	</div>
);
DocCode.displayName = "DocProps";

export default Doc;
