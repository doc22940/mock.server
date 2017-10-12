// @flow
/* eslint no-undef: 0*/

// import 'spectre.css';
import React, {PureComponent} from 'react';
import './index.css';
import delayed from '../utils/delayed';
import type {
	NotificationType,
	NotificationsPropsType,
	NotificationsStateType,
	NotificationInnerType,
} from '../../spectre-ui.js.flow';

function getEventName(channel?: string = 'n'): string {
	return `spectre-ui-notifications-${channel}`;
}

class Notifications extends PureComponent<NotificationsPropsType, NotificationsStateType> {
	static displayName = 'Notifications';

	state = {
		notifications: undefined,
	};

	componentDidMount() {
		document.addEventListener(getEventName(this.props.channel), this.handleEventRecieved);
	}

	componentWillUnmount() {
		document.removeEventListener(getEventName(this.props.channel), this.handleEventRecieved);
	}

	handleEventRecieved = (event: Event) => {
		const {notifications} = this.state;
		// $FlowFixMe
		const notification: NotificationInnerType = event.detail;
		// $FlowFixMe
		notification.id = new Date().getTime().toString();

		const _notifications = {...notifications};
		_notifications[notification.id] = notification;

		this.setState(
			{
				notifications: _notifications,
			},
			() => {
				if ((notification.delay || -1) > 0) {
					delayed(this.updateNotifications.bind(this, notification.id), notification.delay);
				}
			}
		);
	};

	updateNotifications = (key: string) => {
		const {notifications} = this.state;
		const _notifications = {...notifications};
		delete _notifications[key];
		this.setState({
			notifications: _notifications,
		});
	};

	renderNotification = (key: string): React$Element<*> => {
		const {notifications} = this.state;
		if (!notifications) {
			return <li />;
		}
		const notification = notifications[key];
		return (
			<li key={key} className="notification-entry">
				{notification.render({
					handleCloseNotification: this.updateNotifications.bind(this, key),
				})}
			</li>
		);
	};

	render(): React$Element<*> {
		const {notifications} = this.state;
		const notificationArr: Array<string> = Object.keys(notifications || {});
		if (notificationArr.length < 1) {
			return <div />;
		}
		const out = [];
		notificationArr.forEach((key: string) => {
			out.push(this.renderNotification(key));
		});
		return <ul className="notification">{out}</ul>;
	}
}

export function notify(props: NotificationType) {
	document.dispatchEvent(
		new CustomEvent(getEventName(props.channel), {
			detail: props,
		})
	);
}

export default Notifications;
