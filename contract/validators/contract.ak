use aiken/list.{filter, length}
use aiken/transaction.{ScriptContext, Spend, Transaction}
use aiken/transaction/credential.{from_verification_key}
use aiken/transaction/value.{AssetName, PolicyId}
use contract/constants.{demarket_addr, demarket_pct}
use contract/types.{VerificationKeyHash}
use contract/utils.{
  check_address, check_amount, check_none, find_output, must_be_signed_by,
}

type Datum {
  policyId: PolicyId,
  assetName: AssetName,
  seller: VerificationKeyHash,
  author: VerificationKeyHash,
  price: Int,
  royalties: Int,
}

validator {
  fn contract(datum: Datum, _redeemer: Void, ctx: ScriptContext) {
    let ScriptContext { transaction, purpose } = ctx
    let Transaction { outputs, .. } = transaction
    let seller_sign = must_be_signed_by(transaction, datum.seller)
    when purpose is {
      Spend(_) ->
        when seller_sign is {
          True -> True

          False -> {
            let demarket_fee: Int = demarket_pct * datum.price / 100
            let output_seller =
              find_output(
                outputs,
                datum.price,
                from_verification_key(datum.seller),
              )

            let output_author =
              find_output(
                outputs,
                datum.royalties,
                from_verification_key(datum.author),
              )

            let output_demarket =
              find_output(outputs, demarket_fee, demarket_addr())

            let check_none_output =
              check_none(output_seller, output_author, output_demarket)
            when check_none_output is {
              True ->
                if datum.seller == datum.author {
                  let list_out =
                    filter(
                      outputs,
                      fn(output) {
                        check_address(
                          output,
                          from_verification_key(datum.seller),
                        ) && check_amount(output, datum.royalties)
                      },
                    )
                  if length(list_out) >= 2 {
                    let list_seller =
                      filter(
                        list_out,
                        fn(output) { check_amount(output, datum.price) },
                      )

                    length(list_seller) >= 1
                  } else {
                    False
                  }
                } else {
                  True
                }

              False -> False
            }
          }
        }
      _ -> False
    }
  }
}
