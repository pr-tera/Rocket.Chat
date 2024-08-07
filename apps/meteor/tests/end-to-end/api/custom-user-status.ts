import { expect } from 'chai';
import { before, describe, it } from 'mocha';

import { getCredentials, api, request, credentials } from '../../data/api-data';

describe('[CustomUserStatus]', () => {
	before((done) => getCredentials(done));

	describe('[/custom-user-status.list]', () => {
		it('should return custom user status', (done) => {
			void request
				.get(api('custom-user-status.list'))
				.set(credentials)
				.expect(200)
				.expect((res) => {
					expect(res.body).to.have.property('statuses').and.to.be.an('array');
					expect(res.body).to.have.property('total');
					expect(res.body).to.have.property('offset');
					expect(res.body).to.have.property('count');
				})
				.end(done);
		});
		it('should return custom user status even requested with count and offset params', (done) => {
			void request
				.get(api('custom-user-status.list'))
				.set(credentials)
				.expect(200)
				.query({
					count: 5,
					offset: 0,
				})
				.expect((res) => {
					expect(res.body).to.have.property('statuses').and.to.be.an('array');
					expect(res.body).to.have.property('total');
					expect(res.body).to.have.property('offset');
					expect(res.body).to.have.property('count');
				})
				.end(done);
		});
	});
});
