import { Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import * as moment from 'moment';

@Scalar('Date')
export class DateScalar {
	description = 'Date custom scalar type';

	parseValue(value: any) {
		return moment(value).format();
	}

	serialize(value: any) {
		return moment(value).format();
	}

	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return parseInt(ast.value, 10);
		}
		return null;
	}
}
