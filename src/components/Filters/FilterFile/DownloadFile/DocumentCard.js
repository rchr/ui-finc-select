import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  Icon,
  MultiColumnList
} from '@folio/stripes/components';
import { withStripes } from '@folio/stripes/core';

class DocumentCard extends React.Component {
  static propTypes = {
    fileUpload: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    fileId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    criteria: PropTypes.string,
    location: PropTypes.string,
    url: PropTypes.string,
    stripes: PropTypes.shape({
      okapi: PropTypes.shape({
        tenant: PropTypes.string.isRequired,
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };


  handleDownloadFile = (file) => {
    const { stripes: { okapi } } = this.props;

    return fetch(`${okapi.url}/finc-select/files/${file.fileId}`, {
      headers: {
        'X-Okapi-Tenant': okapi.tenant,
        'X-Okapi-Token': okapi.token,
      },
    }).then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  renderType = (line) => {
    if (line.label) return <FormattedMessage id="doc.label" />;
    if (line.url) return <FormattedMessage id="doc.url" />;
    if (line.fileUpload) return <FormattedMessage id="doc.file" />;
    // istanbul ignore next
    return null;
  }

  renderUrl = (url) => (
    <a
      data-test-doc-url
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {url}
      <Icon icon="external-link" />
    </a>
  )

  renderLocation = (location) => <span data-test-doc-location>{location}</span>

  renderLabel = (label) => <span data-test-doc-label>{label}</span>
  renderCriteria = (criteria) => <span data-test-doc-criteria>{criteria}</span>

  renderFile = (file) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      data-test-doc-file
      href="#"
      onClick={(e) => {
        this.onDownloadFile(file);
        e.preventDefault();
      }}
      rel="noopener noreferrer"
      target="_blank"
    >
      {file.label}
      <Icon icon="external-link" />
    </a>
  )

  renderReference = (line) => {
    if (line.url) return this.renderUrl(line.url);
    // if (line.label) return this.renderLabel(line.label);
    // if (line.criteria) return this.renderCriteria(line.criteria);
    if (line.location) return this.renderLocation(line.location);
    if (line.fileUpload) return this.renderFile(line.fileUpload);

    return null;
  }

  render() {
    const { fileUpload, label, fileId, url, location } = this.props;
    // const category = get(this.props, ['atType', 'label']);

    const contentData = [];
    if (label) contentData.push({ label });
    // if (criteria) contentData.push({ criteria });
    if (url) contentData.push({ url });
    if (fileUpload) contentData.push({ fileUpload });

    return (
      <Card
        data-test-doc={label}
        headerProps={{ 'data-test-doc-label': label }}
        headerStart={<strong>{label}</strong>}
      >
        {/* <Row>
          <Col xs={category ? 8 : 12}>
            {label &&
              <KeyValue label={<FormattedMessage id="doc.label" />}>
                <div data-test-doc-label>{label}</div>
              </KeyValue>
            }
          </Col>
          <Col xs={category ? 8 : 12}>
            {criteria &&
              <KeyValue criteria={<FormattedMessage id="doc.criteria" />}>
                <div data-test-doc-criteria>{criteria}</div>
              </KeyValue>
            }
          </Col>
          <Col xs={category ? 4 : 0}>
            {category &&
              <KeyValue label={<FormattedMessage id="doc.category" />}>
                <div data-test-doc-category>{category}</div>
              </KeyValue>
            }
          </Col>
        </Row> */}
        <MultiColumnList
          columnMapping={{
            type: <FormattedMessage id="doc.type" />,
            // set name of uploaded file including download link
            reference: <FormattedMessage id="doc.reference" />,
          }}
          contentData={contentData}
          formatter={{
            type: line => this.renderType(line),
            reference: line => this.renderReference(line),
          }}
          interactive={false}
          visibleColumns={['type', 'reference']}
        />
      </Card>
    );
  }
}

export default withStripes(DocumentCard);
