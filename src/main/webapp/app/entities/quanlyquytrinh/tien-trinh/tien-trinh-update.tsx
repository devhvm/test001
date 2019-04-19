import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuyTrinh } from 'app/shared/model/quanlyquytrinh/quy-trinh.model';
import { getEntities as getQuyTrinhs } from 'app/entities/quanlyquytrinh/quy-trinh/quy-trinh.reducer';
import { getEntity, updateEntity, createEntity, reset } from './tien-trinh.reducer';
import { ITienTrinh } from 'app/shared/model/quanlyquytrinh/tien-trinh.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITienTrinhUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITienTrinhUpdateState {
  isNew: boolean;
  quyTrinhId: string;
}

export class TienTrinhUpdate extends React.Component<ITienTrinhUpdateProps, ITienTrinhUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      quyTrinhId: '0',
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

    this.props.getQuyTrinhs();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { tienTrinhEntity } = this.props;
      const entity = {
        ...tienTrinhEntity,
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
    this.props.history.push('/entity/tien-trinh');
  };

  render() {
    const { tienTrinhEntity, quyTrinhs, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gatewayApp.quanlyquytrinhTienTrinh.home.createOrEditLabel">
              <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.home.createOrEditLabel">Create or edit a TienTrinh</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : tienTrinhEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="tien-trinh-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="menuItemCodeLabel" for="menuItemCode">
                    <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.menuItemCode">Menu Item Code</Translate>
                  </Label>
                  <AvField
                    id="tien-trinh-menuItemCode"
                    type="text"
                    name="menuItemCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.name">Name</Translate>
                  </Label>
                  <AvField
                    id="tien-trinh-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="icon">
                    <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.icon">Icon</Translate>
                  </Label>
                  <AvField
                    id="tien-trinh-icon"
                    type="text"
                    name="icon"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="quyTrinh.name">
                    <Translate contentKey="gatewayApp.quanlyquytrinhTienTrinh.quyTrinh">Quy Trinh</Translate>
                  </Label>
                  <AvInput id="tien-trinh-quyTrinh" type="select" className="form-control" name="quyTrinhId">
                    <option value="" key="0" />
                    {quyTrinhs
                      ? quyTrinhs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/tien-trinh" replace color="info">
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
  quyTrinhs: storeState.quyTrinh.entities,
  tienTrinhEntity: storeState.tienTrinh.entity,
  loading: storeState.tienTrinh.loading,
  updating: storeState.tienTrinh.updating,
  updateSuccess: storeState.tienTrinh.updateSuccess
});

const mapDispatchToProps = {
  getQuyTrinhs,
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
)(TienTrinhUpdate);