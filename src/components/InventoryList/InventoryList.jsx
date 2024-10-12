import "./InventoryList.scss";
import deleteIcon from '../../assets/icons/delete_outline-24px.svg';
import editIcon from '../../assets/icons/edit-24px.svg';
import sortIcon from '../../assets/icons/sort-24px.svg';
import viewDetailsIcon from '../../assets/icons/chevron_right-24px.svg';
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import MainCard from '../../components/MainCard/MainCard'
import Link from "../Link/Link";

function InventoryList({ data, warehouseMap, showFlag }) {

	return (
        <MainCard className='inventory-component'>
            <section className='inventory-list'>
            {showFlag && (<div className='inventory-list__header'>
					<h1 className='inventory-list__title'>Inventory</h1>
					<div className='inventory-list__inputs'>
						<Input inputClassName='inventory-list__search-bar' label="Search" hideLabel={true} placeholder='Search...' type='search'/>
						<Button className='inventory-list__add-inventory' to ='/add' variant='primary' >+ Add New Item</Button>
					</div>
				</div>
			)}
                <div className='inventory-list__records-container'>
                    <div className='inventory-list__label'>
						<ul className='inventory-list__label-list'>
							<li className='inventory-list__label-item'>INVENTORY ITEM
								<img src={sortIcon} className='inventory-list__label-sort' />
							</li>
							<li className='inventory-list__label-item'>CATEGORY
								<img src={sortIcon} className='inventory-list__label-sort' />
							</li>
							<li className='inventory-list__label-item'>STATUS
								<img src={sortIcon} className='inventory-list__label-sort' />
							</li>
							
							<li className='inventory-list__label-item'>{showFlag ? 'QTY' : 'QUANTITY'}
								<img src={sortIcon} className='inventory-list__label-sort' />
							</li>
							{showFlag && (
                            <li className='inventory-list__label-item'>WAREHOUSE
								<img src={sortIcon} className='inventory-list__label-sort' />
							</li>)}
							<li className='inventory-list__label-item inventory-list__label-item--actions'>ACTIONS
							</li>
						</ul>
					</div>
                    {
					data.map((item) => {
						return (
							<article className='inventory-record' key={item.id}>
									<ul className='inventory-record__sub-list'>
										<li className='inventory-record__list-item inventory-record__list-item--inventory'>
											<h4 className='inventory-record__label'>INVENTORY ITEM</h4>
											<div className='inventory-record__info'>
												<Link to={`/inventory/${item.id}`} className='inventory-record__info-details--link'><p>{item.item_name}</p></Link>
												<img className='inventory-list__view-details' src={viewDetailsIcon} alt='view inventory detail button' />
											</div>
										</li>
										<li className='inventory-record__list-item inventory-record__list-item--category'>
											<h4 className='inventory-record__label'>CATEGORY</h4>
											<p className='inventory-record__info-details'>{item.category}</p>
										</li>
										<li className='inventory-record__list-item inventory-record__list-item--status'>
											<h4 className='inventory-record__label'>STATUS</h4>
											<p className={`inventory-record__info-details--status ${item.status === 'In Stock' ? 'inventory-record__info-details--in-stock' : 'inventory-record__info-details--out-of-stock'}`}>{item.status.toUpperCase()}</p>
										</li>
										<li className='inventory-record__list-item inventory-record__list-item--qty'>
											<h4 className='inventory-record__label'>QTY</h4>
											<p className='inventory-record__info-details'>{item.quantity}</p>
										</li>
										{showFlag && (
                                        <li className='inventory-record__list-item inventory-record__list-item--warehouse'>
											<h4 className='inventory-record__label'>WAREHOUSE</h4>
											<p className='inventory-record__info-details'>{warehouseMap[item.warehouse_id] || 'Unknown Warehouse'}</p>
										</li>)}
										<li className='inventory-record__actions'>
											<Link to=''><img className='inventory-record__delete' src={deleteIcon} alt='delete item' /></Link>
											<Link to={`/inventory/edit/${item.id}`}><img className='inventory-record__edit' src={editIcon} alt='edit item' /></Link>
										</li>
									</ul>
							</article>
						)
					})
				}
                </div>
            </section>
        </MainCard>
	);
}

export default InventoryList;