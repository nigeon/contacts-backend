import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Repository, getManager } from 'typeorm';
import { Contact, Status as ContactStatus } from '../entities/contact.entity';

const routerOpts: Router.IRouterOptions = {
  prefix: '/contacts',
};
const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  // Limiting fields to id, firstname, lastname ... just for fun :)
  const contactRepository: Repository<Contact> = getManager().getRepository(Contact);
  ctx.body = await contactRepository.find({
    select: ['id', 'firstname', 'lastname'],
    where: { status: ContactStatus.ACTIVE } });
});

router.post('/', async (ctx: Koa.Context) => {
  const contactRepository: Repository<Contact> = getManager().getRepository(Contact);

  let contact: Contact = new Contact();

  // If there's a deleted contact with the provided email, we'll patch and un-delete it
  if (ctx.request.body.email) {
    const deletedContact: Contact = await contactRepository.findOne({
      where: { email: ctx.request.body.email, status: ContactStatus.DELETED },
    });
    if (deletedContact) {
      contact = deletedContact;
      contact.status = ContactStatus.ACTIVE;
    }
  }

  contactRepository.merge(contact, ctx.request.body);

  ctx.body = await contact.save();
});

router.get('/:id', async (ctx: Koa.Context) => {
  const contactRepository: Repository<Contact> = getManager().getRepository(Contact);
  ctx.body = await contactRepository.findOneOrFail({
    where: { id: ctx.params.id, status: ContactStatus.ACTIVE },
  });
});

router.patch('/:id', async (ctx: Koa.Context) => {
  const contactRepository: Repository<Contact> = getManager().getRepository(Contact);

  const contact: Contact = await contactRepository.findOneOrFail(ctx.params.id);
  contactRepository.merge(contact, ctx.request.body);

  ctx.body = await contact.save();
});

router.delete('/:id', async (ctx: Koa.Context) => {
  const contactRepository: Repository<Contact> = getManager().getRepository(Contact);

  const contact: Contact = await contactRepository.findOneOrFail(ctx.params.id);
  contact.status = ContactStatus.DELETED;

  ctx.body = await contact.save();
});

export default router;
