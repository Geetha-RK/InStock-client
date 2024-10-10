import "./WarehouseList.scss";
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import sortIcon from '../../assets/icons/sort-24px.svg';
import viewDetailsIcon from '../../assets/icons/chevron_right-24px.svg';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Link from "../Link/Link";
import IconButton from "../IconButton/IconButton";

function WarehouseList({ data, deleteItemFn }) {
	return (
		<section className='warehouse-component'>
			<section className='warehouse-list'>
				<div className='warehouse-list__header'>
					<h2 className='warehouse-list__title'>Warehouses</h2>
					<div className='warehouse-list__inputs'>
						<Input inputClassName='warehouse-list__search-bar' placeholder='Search...' type='search' label='' onChange=''></Input>
						<Button className='warehouse-list__add-warehouse' to ='/warehouses/add' variant='primary' >Add New Warehouse</Button>
					</div>
				</div>
				<div className='warehouse-list__records-container'>
					<div className='warehouse-list__label'>
						<ul className='warehouse-list__label-list'>
							<li className='warehouse-list__label-item'>WAREHOUSE
								<img src={sortIcon} className='warehouse-list__label-sort' />
							</li>
							<li className='warehouse-list__label-item'>ADDRESS
								<img src={sortIcon} className='warehouse-list__label-sort' />
							</li>
							<li className='warehouse-list__label-item'>CONTACT NAME
								<img src={sortIcon} className='warehouse-list__label-sort' />
							</li>
							<li className='warehouse-list__label-item'>CONTACT INFORMATION
								<img src={sortIcon} className='warehouse-list__label-sort' />
							</li>
							<li className='warehouse-list__label-item'>ACTIONS
							</li>
						</ul>
					</div>
					{
					data.map((item) => {
						return (
							<article className='warehouse-record' key={item.id}>
								<ul className='warehouse-record__list'>
									<ul className='warehouse-record__sub-list'>
										<li className='warehouse-record__list-item'>
											<h4 className='warehouse-record__label'>WAREHOUSE</h4>
											<div className='warehouse-record__info'>
												<Link to={`/warehouses/${item.id}`} className='warehouse-record__info-details--link'><p>{item.warehouse_name}</p></Link>
												<img className='warehouse-list__view-details' src={viewDetailsIcon} alt='view warehouse detail button' />
											</div>
										</li>
										<li className='warehouse-record__list-item'>
											<h4 className='warehouse-record__label'>ADDRESS</h4>
											<p className='warehouse-record__info-details'>{`${item.address}, ${item.city}, ${item.country}`}</p>
										</li>
									</ul>
									<ul className='warehouse-record__sub-list'>
										<li className='warehouse-record__list-item'>
											<h4 className='warehouse-record__label'>CONTACT NAME</h4>
											<p className='warehouse-record__info-details'>{item.contact_name}</p>
										</li>
										<li className='warehouse-record__list-item'>
											<h4 className='warehouse-record__label'>CONTACT INFORMATION</h4>
											<p className='warehouse-record__info-details'>{`${item.contact_phone} ${item.contact_email}`}</p>
										</li>
									</ul>
								</ul>
								<div className='warehouse-record__actions'>
									<IconButton
										text={`Delete ${item.warehouse_name}`}
										className="warehouse-record__delete"
										iconSrc={deleteIcon}
										onClick={() => deleteItemFn(item)}/>
									<Link to={`/warehouses/edit/${item.id}`}>
										<img className='warehouse-record__edit' src={editIcon} alt={`Edit ${item.warehouse_name}`} />
									</Link>
								</div>
							</article>
						)
					})}
				</div>
			</section>
		</section>
	);
}

export default WarehouseList;