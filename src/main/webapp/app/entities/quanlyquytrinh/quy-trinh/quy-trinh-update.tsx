import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './quy-trinh.reducer';
import { IQuyTrinh } from 'app/shared/model/quanlyquytrinh/quy-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuyTrinhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IQuyTrinhUpdateState {
  isNew: boolean;
}

export class QuyTrinhUpdate extends React.Component<IQuyTrinhUpdateProps, IQuyTrinhUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { quyTrinhEntity } = this.props;
      const entity = {
        ...quyTrinhEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/quy-trinh');
  };

  render() {
    const { quyTrinhEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quanlyquytrinhQuyTrinh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.home.createOrEditLabel">Create or edit a QuyTrinh</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : quyTrinhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="quy-trinh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="quyTrinhCodeLabel" for="quyTrinhCode">
                    <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.quyTrinhCode">Quy Trinh Code</Translate>
                  </Label>
                  <AvField
                    id="quy-trinh-quyTrinhCode"
                    type="text"
                    name="quyTrinhCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.name">Name</Translate>
                  </Label>
                  <AvField
                    id="quy-trinh-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="icon">
                    <Translate contentKey="gatewayApp.quanlyquytrinhQuyTrinh.icon">Icon</Translate>
                  </Label>
                  <AvField
                    id="quy-trinh-icon"
                    type="text"
                    name="icon"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/quy-trinh" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  quyTrinhEntity: storeState.quyTrinh.entity,
  loading: storeState.quyTrinh.loading,
  updating: storeState.quyTrinh.updating,
  updateSuccess: storeState.quyTrinh.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuyTrinhUpdate);